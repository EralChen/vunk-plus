<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import type { PropType } from 'vue'
import type { Datum, LoadEvent } from './types'
import { useModelComputed } from '@vunk/core/composables'
import { TickerStatus } from '@vunk/shared/enum'
import { sleep } from '@vunk/shared/promise'
import { Assets } from 'pixi.js'
import { computed, onBeforeUnmount, ref, useId, watch, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { useSprite } from './useSprite'

const props = defineProps({
  ...dProps,
  data: {
    type: undefined as unknown as PropType<Datum[] | string[]>,
    required: true,
  },
  frameIndex: {
    type: Number,
    default: 0,
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
    const src = typeof enabledData.value[key] === 'string'
      ? enabledData.value[key]
      : (enabledData.value[key] as Datum)?.src

    if (!src) {
      continue
    }

    if (textureMap.has(alias)) {
      continue
    }

    Assets.add({
      alias,
      src,
    })
    textureMap.set(alias, undefined as never)

    Assets.load(alias).then((res) => {
      res._meta = enabledData.value[key]
      textureMap.set(alias, res)
      if (props.prerender && theKey === 0) {
        sprite.texture = res
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
let animationId: number | null = null
let lastFrameTime = 0

function startFrameLoop () {
  if (animationId !== null)
    return // 防止重复启动

  lastFrameTime = performance.now()

  function renderFrame () {
    const now = performance.now()
    const frameDuration = 1000 / props.frameRate
    const delta = now - lastFrameTime

    if (delta >= frameDuration) {
      lastFrameTime = now - (delta % frameDuration) // 修正误差抖动
      // 执行绘制逻辑
      drawFrame()
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
          .then(() => Assets.unload(
            getAlias(originIndex),
          ))
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

  // 启动动画循环
  animationId = requestAnimationFrame(renderFrame)
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
    emit('update:status', TickerStatus.playing)
    startFrameLoop()
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
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  emit('update:data', [])
  textureMap.clear()
  index.value = 0
}
</script>

<template>
  <slot></slot>
</template>
