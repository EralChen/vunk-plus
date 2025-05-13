<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { TickerStatus } from '@vunk/shared/enum'
import { sleep } from '@vunk/shared/promise'

import { Assets, Sprite } from 'pixi.js'
import { onBeforeUnmount, ref, useId, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { usePixiApp } from './use'

const props = defineProps(dProps)
const emit = defineEmits(emits)
const { application: app, context } = usePixiApp()
const compId = useId()
const getAlias = (key: string | number) => `${compId}-${key}`
// 创建精灵并将其添加到舞台
const sprite = new Sprite()
app.stage.addChild(sprite)

context.when().then((app) => {
  if (sprite.texture) {
    resizeSprite()
    app.renderer.on(
      'resize',
      () => {
        resizeSprite()
      },
    )
  }
})

function resizeSprite () {
  if (!app.renderer?.screen)
    return
  // === 设置 sprite 尺寸自适应 ===
  const scaleX = app.screen.width / sprite.texture.width
  const scaleY = app.screen.height / sprite.texture.height
  const scale = Math.min(scaleX, scaleY) // 保持比例
  sprite.scale.set(scale)
  // 居中显示
  sprite.x = (app.screen.width - sprite.width) / 2
  sprite.y = (app.screen.height - sprite.height) / 2
}

const textureMap = new Map<string, Texture>()

watchEffect(() => {
  for (const key in props.data) {
    const alias = `${compId}-${key}`
    const url = props.data[key]

    if (textureMap.has(alias)) {
      continue
    }

    Assets.add({
      alias,
      src: url,
    })
    textureMap.set(alias, undefined as never)

    Assets.load(alias).then((res) => {
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

onBeforeUnmount(() => {
  stop()
  app.stage.removeChild(sprite)
})

watchEffect(() => {
  if (props.status === TickerStatus.play) {
    play()
  }
  else if (props.status === TickerStatus.pause) {
    pause()
  }
  else if (props.status === TickerStatus.stop) {
    stop()
  }
})
</script>

<template>
  <slot></slot>
</template>
