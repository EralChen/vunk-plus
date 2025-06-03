<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import type { PropType } from 'vue'
import type { Datum } from './types'
import { TickerStatus } from '@vunk/shared/enum'
import { sleep } from '@vunk/shared/promise'
import { Assets } from 'pixi.js'
import { onBeforeUnmount, ref, useId, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { useSprite } from './useSprite'

const props = defineProps({
  ...dProps,
  data: {
    type: undefined as unknown as PropType<Datum[] | string[]>,
    required: true,
  },
})
const emit = defineEmits(emits)
const compId = useId()
const getAlias = (key: string | number) => `${compId}-${key}`
// 创建精灵并将其添加到舞台
const { sprite, resizeSprite } = useSprite(props)

const textureMap = new Map<string, Texture>()

watchEffect(() => {
  for (const key in props.data) {
    const alias = `${compId}-${key}`
    const src = typeof props.data[key] === 'string'
      ? props.data[key]
      : props.data[key].src

    if (textureMap.has(alias)) {
      continue
    }

    Assets.add({
      alias,
      src,
    })
    textureMap.set(alias, undefined as never)

    Assets.load(alias).then((res) => {
      res._meta = props.data[key]
      textureMap.set(alias, res)
      if (key === '0') {
        sprite.texture = res
        resizeSprite()
      }
    })
  }
})

const index = ref(0)
let timer: number | null = null
function startFrameLoop () {
  if (timer !== null)
    return // 防止重复启动

  timer = window.setInterval(() => {
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
      if (!props.loop)
        emit('update:status', TickerStatus.paused)
    }
  }, 1000 / props.frameRate) // 每 40ms 一帧
}

onBeforeUnmount(stop)

watchEffect(() => {
  props.status === TickerStatus.play && play()
  props.status === TickerStatus.pause && pause()
  props.status === TickerStatus.stop && stop()
})

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
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
  emit('update:data', [])
  textureMap.clear()
  index.value = 0
}
</script>

<template>
  <slot></slot>
</template>
