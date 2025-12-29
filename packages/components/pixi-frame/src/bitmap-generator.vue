<script lang="ts" setup>
import type { PropType } from 'vue'
import type { LoadEvent } from './types'
import { TickerStatus } from '@vunk/shared/enum'
import { pickObject } from '@vunk/shared/object'
import { ImageSource, Texture } from 'pixi.js'
import { onBeforeUnmount, watch } from 'vue'
import { props as dProps } from './ctx'
import { useSprite } from './useSprite'

const props = defineProps({
  ...pickObject(dProps, {
    excludes: ['loop'],
  }),
  generator: {
    type: Object as PropType<AsyncGenerator<ImageBitmap>>,
    required: true,
  },
})
const emit = defineEmits({
  'update:status': null,
  'load': (e: LoadEvent) => e,
})

// 创建精灵并将其添加到舞台
const { sprite, resizeSprite, application } = useSprite(props)
const texture = new Texture({
  dynamic: true,
})
sprite.texture = texture

function updateTextureFromBitmap (bitmap: ImageBitmap) {
  texture.source.resource?.close()
  texture.source.destroy()

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

watch(() => props.status, (newStatus) => {
  newStatus === TickerStatus.play && play()
  newStatus === TickerStatus.pause && pause()
  newStatus === TickerStatus.stop && stop()
}, { immediate: true })

function drawFrame () {
  if (props.status !== TickerStatus.playing) {
    return
  }
  props.generator
    .next()
    .then(({ value, done }) => {
      if (done) {
        return emit('update:status', TickerStatus.stopped)
      }
      updateTextureFromBitmap(value)
    })
}
// 开始播放动画
function play () {
  application.ticker.minFPS = props.frameRate
  application.ticker.maxFPS = props.frameRate

  emit('update:status', TickerStatus.playing)
  application.ticker.add(drawFrame)
}
// 停止动画
function pause () {
  application.ticker.remove(drawFrame)
  emit('update:status', TickerStatus.paused)
}

function stop () {
  application.ticker.remove(drawFrame)
  emit('update:status', TickerStatus.stopped)
}

onBeforeUnmount(() => {
  stop()
  texture.destroy()
})
</script>

<template>
  <slot></slot>
</template>
