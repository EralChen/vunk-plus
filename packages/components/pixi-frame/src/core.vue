<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { TickerStatus } from '@vunk/shared/enum'
import { Assets, Sprite } from 'pixi.js'
import { nextTick, ref, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { usePixiApp } from './use'

const props = defineProps(dProps)
const emit = defineEmits(emits)
const app = usePixiApp()
// 创建精灵并将其添加到舞台
const sprite = new Sprite()
app.stage.addChild(sprite)

function resizeSprite () {
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
    const url = props.data[key]
    if (textureMap.has(url)) {
      continue
    }
    Assets.load(url).then((res) => {
      textureMap.set(url, res)
      if (key === '0') {
        sprite.texture = res
        resizeSprite()
      }
    })
  }
})

const index = ref(0)
const frameRate = ref(25) // 每秒帧数

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

    const currentTexture = textureMap.get(props.data[index.value])

    console.log('currentTexture', index.value, currentTexture)

    if (currentTexture) {
      sprite.texture = currentTexture
      resizeSprite()
      index.value = index.value + 1
    }
    else {
      emit('update:status', TickerStatus.paused)
    }
  }, 1000 / frameRate.value) // 每 40ms 一帧
}

// 开始播放动画
function play () {
  if (props.data.length > 0) {
    nextTick(() => {
      emit('update:status', TickerStatus.playing)
      startFrameLoop()
    })
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
