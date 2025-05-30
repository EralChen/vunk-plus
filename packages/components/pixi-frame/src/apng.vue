<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { useDeferred } from '@vunk/core/composables'
import { TickerStatus } from '@vunk/shared/enum'
import parseAPNG from 'apng-js'
import { Assets, Texture as PixiTexture } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref, useId, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { useSprite } from './useSprite'

interface APNGFrame {
  imageData: ImageData
  delay: number
}

const props = defineProps({
  ...dProps,
  url: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(emits)
const compId = useId()
const getAlias = (frameIndex: number) => `${compId}-apng-frame-${frameIndex}`

// 使用 useSprite 统一管理 sprite
const { sprite, resizeSprite } = useSprite({
  autoResize: true,
})

// APNG相关状态
const frames = ref<APNGFrame[]>([])
const currentFrame = ref(0)
const isLoaded = ref(false)
const error = ref('')
const readyDef = useDeferred()

// 纹理缓存管理
const textureMap = new Map<string, Texture>()
const loadedFrames = new Set<number>()

// 播放控制
let animationId: number | null = null
let lastFrameTime = 0

// 复用的 canvas 元素
let reusableCanvas: HTMLCanvasElement | null = null
let reusableCtx: CanvasRenderingContext2D | null = null

readyDef.promise.then(() => {
  if (props.status === TickerStatus.play) {
    play()
  }
})

onMounted(() => loadAPNG(props.url))

// 获取或创建复用的 canvas
function getReusableCanvas (width: number, height: number) {
  if (!reusableCanvas) {
    reusableCanvas = document.createElement('canvas')
    reusableCtx = reusableCanvas.getContext('2d', { willReadFrequently: true })!
  }

  if (reusableCanvas.width !== width || reusableCanvas.height !== height) {
    reusableCanvas.width = width
    reusableCanvas.height = height
  }

  return { canvas: reusableCanvas, ctx: reusableCtx! }
}

// 加载APNG文件
async function loadAPNG (url: string) {
  try {
    error.value = ''
    isLoaded.value = false
    await cleanup() // 清理之前的资源

    // 获取APNG文件
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`加载APNG失败: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()

    // 解析APNG
    const apng = parseAPNG(arrayBuffer)

    if (apng instanceof Error) {
      throw new TypeError(`APNG解析失败: ${apng.message}`)
    }

    // 获取复用的 canvas
    const { canvas, ctx } = getReusableCanvas(apng.width, apng.height)

    // 处理每一帧
    const framePromises = apng.frames.map(async (frame) => {
      // 清空canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 使用 frame.imageData 获取帧数据
      const blob = frame.imageData
      if (!blob) {
        throw new Error('帧数据为空')
      }
      const img = new Image()

      // 创建 blob URL
      const imgUrl = URL.createObjectURL(blob)

      try {
        // 等待图片加载
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = reject
          img.src = imgUrl
        })

        // 绘制到canvas
        ctx.drawImage(img, frame.left, frame.top)

        // 获取ImageData
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        return {
          imageData,
          delay: frame.delay || 100, // 默认100ms延迟
        }
      }
      finally {
        // 清理URL
        URL.revokeObjectURL(imgUrl)
      }
    })

    frames.value = await Promise.all(framePromises)

    if (frames.value.length > 0) {
      // 预加载第一帧
      await loadFrameTexture(0)
      isLoaded.value = true
      readyDef.resolve()
    }
    else {
      throw new Error('APNG文件没有有效帧')
    }
  }
  catch (err) {
    console.error('加载APNG失败:', err)
    error.value = err instanceof Error ? err.message : '加载APNG失败'
    emit('update:status', TickerStatus.stopped)
  }
}

// 异步加载帧纹理
async function loadFrameTexture (frameIndex: number): Promise<Texture | null> {
  if (!frames.value[frameIndex]) {
    return null
  }

  const alias = getAlias(frameIndex)

  // 检查是否已经加载
  if (textureMap.has(alias)) {
    return textureMap.get(alias)!
  }

  const frame = frames.value[frameIndex]
  const { imageData } = frame

  // 使用复用的 canvas 创建纹理
  const { canvas, ctx } = getReusableCanvas(imageData.width, imageData.height)

  // 将ImageData绘制到canvas
  ctx.putImageData(imageData, 0, 0)

  // 创建纹理并添加到 Assets 系统
  const dataUrl = canvas.toDataURL()
  Assets.add({ alias, src: dataUrl })

  const texture = await Assets.load(alias)
  textureMap.set(alias, texture)
  loadedFrames.add(frameIndex)

  return texture
}

// 更新帧纹理
async function updateFrameTexture (frameIndex: number) {
  if (!frames.value[frameIndex]) {
    return
  }

  const texture = await loadFrameTexture(frameIndex)
  if (texture) {
    sprite.texture = texture
    currentFrame.value = frameIndex
    resizeSprite()

    // 清理旧帧纹理（非循环播放且不是当前帧和下一帧）
    if (!props.loop) {
      cleanupOldTextures(frameIndex)
    }
  }
}

// 清理旧的纹理（保留当前帧和下一帧）
function cleanupOldTextures (currentIndex: number) {
  const keepFrames = new Set([
    currentIndex,
    currentIndex + 1,
    Math.max(0, currentIndex - 1), // 也保留前一帧以防回退
  ])

  for (const frameIndex of loadedFrames) {
    if (!keepFrames.has(frameIndex)) {
      const alias = getAlias(frameIndex)
      const texture = textureMap.get(alias)

      if (texture && texture !== sprite.texture) {
        // 使用 Assets.unload 清理资源
        Assets.unload(alias).catch((err) => {
          console.warn('清理纹理失败:', err)
        })

        textureMap.delete(alias)
        loadedFrames.delete(frameIndex)
      }
    }
  }
}

// 播放动画
function play () {
  if (!isLoaded.value || frames.value.length <= 1) {
    return
  }

  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }

  emit('update:status', TickerStatus.playing)
  lastFrameTime = performance.now()
  animate()
}

// 动画循环
function animate () {
  const now = performance.now()
  // 使用props.frameRate计算帧间隔，确保FPS可靠
  const frameInterval = 1000 / props.frameRate // 毫秒

  if (now - lastFrameTime >= frameInterval) {
    let nextFrame = currentFrame.value + 1

    if (nextFrame >= frames.value.length) {
      if (props.loop) {
        nextFrame = 0
      }
      else {
        // 动画结束
        emit('update:status', TickerStatus.stopped)
        return
      }
    }

    updateFrameTexture(nextFrame)
    lastFrameTime = now
  }

  animationId = requestAnimationFrame(animate)
}

// 暂停动画
function pause () {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  emit('update:status', TickerStatus.paused)
}

// 停止动画
function stop () {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }

  // 回到第一帧
  if (frames.value.length > 0) {
    updateFrameTexture(0)
  }

  emit('update:status', TickerStatus.stopped)
}

// 清理所有资源
async function cleanup () {
  // 停止动画
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }

  // 清理所有纹理
  const unloadPromises: Promise<void>[] = []
  for (const [alias, texture] of textureMap) {
    if (texture && texture !== PixiTexture.EMPTY) {
      // 使用 Assets.unload 清理资源
      unloadPromises.push(
        Assets.unload(alias).catch((err) => {
          console.warn('清理纹理失败:', err)
        }),
      )
    }
  }

  // 等待所有资源清理完成
  await Promise.all(unloadPromises)

  // 清理状态
  textureMap.clear()
  loadedFrames.clear()
  frames.value = []
  currentFrame.value = 0
  isLoaded.value = false
  error.value = ''

  // 清理复用的 canvas（在组件销毁时）
  if (reusableCanvas) {
    reusableCanvas.width = 0
    reusableCanvas.height = 0
  }
}

// 监听播放状态变化
watchEffect(() => {
  switch (props.status) {
    case TickerStatus.play:
      play()
      break
    case TickerStatus.pause:
      pause()
      break
    case TickerStatus.stop:
      stop()
      break
  }
})

// 组件销毁时清理资源
onBeforeUnmount(async () => {
  await cleanup()

  // 清理复用的 canvas
  reusableCanvas = null
  reusableCtx = null
})
</script>

<template>
  <slot></slot>
</template>
