<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { TickerStatus } from '@vunk/shared/enum'
import { sleep } from '@vunk/shared/promise'
import parseAPNG from 'apng-js'
import { Assets, Texture as PixiTexture } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref, useId, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { useSprite } from './useSprite'

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
const { sprite, resizeSprite } = useSprite(props)

// APNG相关状态
const frames = ref<string[]>([])
const index = ref(0)
const isLoaded = ref(false)
const error = ref('')

// 纹理缓存管理（类似 core.vue）
const textureMap = new Map<string, Texture>()

// 播放控制
let timer: number | null = null

// 复用的 canvas 元素
let reusableCanvas: HTMLCanvasElement | null = null
let reusableCtx: CanvasRenderingContext2D | null = null

onMounted(() => loadAPNG(props.url))

// 获取或创建复用的 canvas
function getReusableCanvas (width: number, height: number) {
  if (!reusableCanvas) {
    reusableCanvas = document.createElement('canvas')
    reusableCtx = reusableCanvas.getContext('2d', {
      willReadFrequently: true,
    })!
  }

  if (reusableCanvas.width !== width || reusableCanvas.height !== height) {
    reusableCanvas.width = width
    reusableCanvas.height = height
  }

  return { canvas: reusableCanvas, ctx: reusableCtx! }
}

// 加载APNG文件并预加载所有帧纹理（类似 core.vue 的 watchEffect 逻辑）
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
    const framePromises = apng.frames.map(async (frame, frameIndex) => {
      // 清空canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 使用 frame.imageData 获取帧数据
      await frame.createImage()
      const img = frame.imageElement as HTMLImageElement
      ctx.drawImage(img, frame.left, frame.top)

      // 获取ImageData
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // 立即创建纹理并加载到 textureMap（类似 core.vue）
      const alias = getAlias(frameIndex)

      // 先设置为 undefined 占位
      textureMap.set(alias, undefined as never)

      // 将ImageData转换为纹理
      ctx.putImageData(imageData, 0, 0)
      const dataUrl = canvas.toDataURL()
      Assets.add({ alias, src: dataUrl })

      // 加载纹理
      const texture = await Assets.load(alias)
      textureMap.set(alias, texture)

      // 如果是第一帧，立即显示
      if (frameIndex === 0) {
        sprite.texture = texture
        resizeSprite()
      }

      return alias
    })

    frames.value = await Promise.all(framePromises)
    isLoaded.value = true
  }
  catch (err) {
    console.error('加载APNG失败:', err)
    error.value = err instanceof Error ? err.message : '加载APNG失败'
    emit('update:status', TickerStatus.stopped)
  }
}

// 开始帧循环（完全参考 core.vue 的逻辑）
function startFrameLoop () {
  if (timer !== null)
    return // 防止重复启动

  timer = window.setInterval(() => {
    if (
      frames.value.length === 0
      || props.status !== TickerStatus.playing
    ) {
      return
    }

    const currentTexture = textureMap.get(
      getAlias(index.value),
    )

    if (currentTexture) {
      /* 清理上一帧（非循环播放时） */
      const originIndex = index.value - 1
      if (
        originIndex >= 0
        && !props.loop
      ) {
        // 延迟清理，类似 core.vue
        Promise.resolve()
          .then(() => sleep(500))
          .then(() => {
            Assets.unload(getAlias(originIndex))
            textureMap.delete(getAlias(originIndex))
          })
      }
      /* 清理上一帧 END */

      sprite.texture = currentTexture

      resizeSprite()

      index.value = props.loop
        ? (index.value + 1) % frames.value.length // 循环播放
        : index.value + 1 // 非循环播放
    }
    else {
      if (!props.loop)
        emit('update:status', TickerStatus.paused)
    }
  }, 1000 / props.frameRate) // 使用 props.frameRate 计算帧间隔
}

// 播放动画
function play () {
  if (!isLoaded.value || frames.value.length <= 1) {
    return
  }

  emit('update:status', TickerStatus.playing)
  startFrameLoop()
}

// 暂停动画
function pause () {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
  emit('update:status', TickerStatus.paused)
}

// 停止动画
function stop () {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }

  // 回到第一帧
  index.value = 0
  const firstTexture = textureMap.get(getAlias(0))
  if (firstTexture) {
    sprite.texture = firstTexture
    resizeSprite()
  }

  emit('update:status', TickerStatus.stopped)
}

// 清理所有资源
async function cleanup () {
  // 停止动画
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }

  // 清理所有纹理
  const unloadPromises: Promise<void>[] = []
  for (const [alias, texture] of textureMap) {
    if (texture && texture !== PixiTexture.EMPTY) {
      unloadPromises.push(Assets.unload(alias))
    }
  }

  // 等待所有资源清理完成
  await Promise.all(unloadPromises)

  // 清理状态
  textureMap.clear()
  frames.value = []
  index.value = 0
  isLoaded.value = false
  error.value = ''

  // 清理复用的 canvas
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
