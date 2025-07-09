<script lang="ts" setup>
import type { PropType } from 'vue'
import type { LoadEvent } from './types'
import { useModelComputed } from '@vunk/core/composables'
import { TickerStatus } from '@vunk/shared/enum'
import { sleep } from '@vunk/shared/promise'
import { ImageSource, Texture } from 'pixi.js'

import { computed, nextTick, onBeforeUnmount, ref, useId, watch, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { useSprite } from './useSprite'

const props = defineProps({
  ...dProps,
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
const compId = useId()
const getAlias = (key: string | number) => `${compId}-${key}`
// 创建精灵并将其添加到舞台
const { sprite, resizeSprite, application } = useSprite(props)

const textureMap = new Map<string, Texture>()
const completedIndex = ref(0)
const enabledData = computed(() => {
  return props.data.slice(completedIndex.value)
})

watchEffect(() => {
  for (const key in enabledData.value) {
    const theKey = +key + completedIndex.value
    const alias = `${compId}-${theKey}`
    const image = enabledData.value[key]

    if (!image) {
      continue
    }

    if (textureMap.has(alias)) {
      continue
    }

    const source = new ImageSource({
      resource: image,
    })

    const texture = new Texture({
      source,
    })

    textureMap.set(alias, undefined as never)

    nextTick(() => {
      (texture as any)._meta = enabledData.value[key]
      textureMap.set(alias, texture)
      if (props.prerender && theKey === 0) {
        sprite.texture = texture
        resizeSprite()
      }
    })
  }
})

emit('load', {
  application,
  sprite,
})

const index = useModelComputed({
  default: 0,
  key: 'frameIndex',
}, props, emit)

function drawFrame () {
  if (
    props.data.length === 0
    || props.status !== TickerStatus.playing
  ) {
    return
  }

  const currentTexture = textureMap.get(
    getAlias(index.value),
  )

  if (currentTexture) {
    /* 清理上一帧 */
    const originTexture = sprite.texture
    const originIndex = index.value - 1
    if (
      originTexture && originIndex >= 0
      && !props.loop
    ) {
      Promise
        .resolve(sleep(500))
        .then(() => {
          textureMap.set(
            getAlias(originIndex),
            undefined as never,
          )
          emit('setData', {
            k: originIndex,
            v: '',
          })
          completedIndex.value = originIndex
        })
    }
    /* 清理上一帧 END */

    sprite.texture = currentTexture

    resizeSprite()

    index.value = props.loop
      ? (index.value + 1) % props.data.length // 循环播放
      : index.value + 1 // 非循环播放
  }
  else {
    console.warn(
      `Texture for index ${index.value} not found. Ensure the texture is loaded.`,
    )
    emit('notFound', index.value)
    if (!props.loop)
      emit('update:status', TickerStatus.paused)
  }
}

onBeforeUnmount(stop)

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
// 停止动画
function pause () {
  emit('update:status', TickerStatus.paused)
}

function stop () {
  emit('update:status', TickerStatus.stopped)
  application.ticker.remove(drawFrame)
  emit('update:data', [])
  textureMap.clear()
  index.value = 0
}
</script>

<template>
  <slot></slot>
</template>
