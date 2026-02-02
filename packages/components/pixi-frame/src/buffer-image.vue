<script lang="ts" setup>
import type { TEXTURE_FORMATS } from 'pixi.js'
import type { PropType } from 'vue'
import type { LoadEvent } from './types'
import { useModelComputed } from '@vunk/core/composables'
import { TickerStatus } from '@vunk/shared/enum'
import { pickObject } from '@vunk/shared/object'
import { sleep } from '@vunk/shared/promise'
import { BufferImageSource, Texture } from 'pixi.js'
import { onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { useSprite } from './useSprite'

const props = defineProps({
  ...pickObject(dProps, {
    excludes: ['loop'],
  }),
  data: {
    type: Array,
    required: true,
  },
  /**
   * Pixel format for BufferImageSource.
   * Default to rgba8unorm for broadest compatibility (WebGL often ignores format hints).
   */
  format: {
    type: String as PropType<TEXTURE_FORMATS>,
    default: 'rgba8unorm' as TEXTURE_FORMATS,
  },
  frameIndex: {
    type: Number,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits({
  ...emits,
  'load': (e: LoadEvent) => e,
  'update:frameIndex': null,
  'notFound': (_index: number) => true,
})

// 创建精灵并将其添加到舞台
const { sprite, resizeSprite, application } = useSprite(props)

/**
 * 单个动态纹理：仅更新 source，不再为每帧创建 Texture
 * 参考 bitmap-generator.vue
 */
const texture = new Texture({
  dynamic: true,
})
sprite.texture = texture

function updateTexture (resource: any) {
  // 释放上一帧的 source，避免累计占用
  texture.source?.destroy()
  const source = new BufferImageSource({
    resource,
    height: props.height,
    width: props.width,
    format: props.format,
  })
  texture.source = source
  texture.update()
  resizeSprite()
}

emit('load', {
  application,
  sprite,
})

const index = useModelComputed({
  default: 0,
  key: 'frameIndex',
}, props, emit)

/**
 * 避免重复清理同一帧（暂停/继续时可能重复触发）
 */
const lastScheduledClearIndex = ref(-1)

function scheduleClearFrame (frameIndex: number) {
  if (frameIndex <= lastScheduledClearIndex.value)
    return

  lastScheduledClearIndex.value = frameIndex

  sleep(0).then(() => {
    emit('setData', {
      k: frameIndex,
      v: null,
    })
  })
}

let animationId: number | null = null
let lastFrameTime = 0
let frameCount = 0
let lastFpsUpdateTime = 0

function startFrameLoop () {
  if (animationId !== null)
    return // 防止重复启动

  lastFrameTime = performance.now()
  lastFpsUpdateTime = lastFrameTime
  frameCount = 0

  function renderFrame () {
    const now = performance.now()
    const frameDuration = 1000 / props.frameRate
    const delta = now - lastFrameTime

    if (delta >= frameDuration) {
      lastFrameTime = now - (delta % frameDuration) // 修正误差抖动

      // 执行绘制逻辑
      drawFrame()

      // 统计 FPS
      frameCount++
      const elapsed = now - lastFpsUpdateTime
      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / elapsed)
        console.log(`[Bitmap] FPS: ${currentFps}`)
        frameCount = 0
        lastFpsUpdateTime = now
      }
    }

    // 只有在播放状态下才继续请求下一帧
    if (props.status === TickerStatus.playing) {
      animationId = requestAnimationFrame(renderFrame)
    }
    else {
      animationId = null
    }
  }

  function drawFrame () {
    if (
      props.data.length === 0
      || props.status !== TickerStatus.playing
    ) {
      return
    }

    const bitmap = props.data[index.value]
    if (bitmap) {
      const originIndex = index.value - 1
      if (originIndex >= 0) {
        scheduleClearFrame(originIndex)
      }

      updateTexture(bitmap)

      index.value = index.value + 1 // 非循环播放
    }
    else {
      console.warn(
        `Bitmap for index ${index.value} not found. Ensure the data is loaded.`,
      )
      emit('notFound', index.value)
    }
  }

  // 启动动画循环
  animationId = requestAnimationFrame(renderFrame)
}

watchEffect(() => {
  // 预渲染第一帧（仅在有资源时）
  if (
    props.prerender
    && index.value === 0
    && props.data.length > 0
    && props.data[0]
  ) {
    updateTexture(props.data[0])
  }
})

watch(() => props.status, (newStatus) => {
  newStatus === TickerStatus.play && play()
  newStatus === TickerStatus.pause && pause()
  newStatus === TickerStatus.stop && stop()
}, { immediate: true })

// 开始播放动画
function play () {
  if (props.data.length > 0) {
    emit('update:status', TickerStatus.playing)
    startFrameLoop()
  }
  else {
    emit('update:status', TickerStatus.stopped)
  }
}

// 暂停动画
function pause () {
  emit('update:status', TickerStatus.paused)
}

function stop () {
  emit('update:status', TickerStatus.stopped)
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  emit('update:data', [])
  index.value = 0
  lastScheduledClearIndex.value = -1
}

onBeforeUnmount(() => {
  stop()
  texture.destroy()
})
</script>

<template>
  <slot></slot>
</template>
