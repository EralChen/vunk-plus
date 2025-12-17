<script lang="ts" setup>
import type { PropType } from 'vue'
import type { LoadEvent } from './types'
import { useModelComputed } from '@vunk/core/composables'
import { TickerStatus } from '@vunk/shared/enum'
import { pickObject } from '@vunk/shared/object'
import { sleep } from '@vunk/shared/promise'
import { ImageSource, Texture } from 'pixi.js'
import { onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { useSprite } from './useSprite'

const props = defineProps({
  ...pickObject(dProps, {
    excludes: ['loop'],
  }),
  data: {
    type: undefined as unknown as PropType<ImageBitmap[]>,
    required: true,
  },
  frameIndex: {
    type: Number,
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

function updateTextureFromBitmap (bitmap: ImageBitmap) {
  // 释放上一帧的 source，避免累计占用
  texture.source?.destroy()
  const source = new ImageSource({
    resource: bitmap,
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

  Promise
    .resolve(sleep(500))
    .then(() => {
      emit('setData', {
        k: frameIndex,
        v: null,
      })
    })
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

    updateTextureFromBitmap(bitmap)

    index.value = index.value + 1 // 非循环播放
  }
  else {
    console.warn(
      `Bitmap for index ${index.value} not found. Ensure the data is loaded.`,
    )
    emit('notFound', index.value)
  }
}

watchEffect(() => {
  // 预渲染第一帧（仅在有资源时）
  if (
    props.prerender
    && index.value === 0
    && props.data.length > 0
    && props.data[0]
  ) {
    updateTextureFromBitmap(props.data[0])
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
    application.ticker.minFPS = props.frameRate
    application.ticker.maxFPS = props.frameRate

    emit('update:status', TickerStatus.playing)
    application.ticker.add(drawFrame)
  }
  else {
    emit('update:status', TickerStatus.stopped)
  }
}

// 暂停动画
function pause () {
  application.ticker.remove(drawFrame)
  emit('update:status', TickerStatus.paused)
}

function stop () {
  application.ticker.remove(drawFrame)
  emit('update:status', TickerStatus.stopped)
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
