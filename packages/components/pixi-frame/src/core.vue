<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { Assets, Sprite } from 'pixi.js'
import { ref, watchEffect } from 'vue'
import { props as dProps } from './ctx'
import { usePixiApp } from './use'

const props = defineProps(dProps)
const app = usePixiApp()
// 创建精灵并将其添加到舞台
const sprite = new Sprite()
app.stage.addChild(sprite)

const textureMap = new Map<string, Texture>()

watchEffect(() => {
  for (const url of props.data) {
    if (textureMap.has(url)) {
      continue
    }
    Assets.load(url).then((res) => {
      textureMap.set(url, res)
    })
  }
})

const index = ref(0)
const frameRate = ref(24) // 每秒帧数
let isPlaying = false
let lastFrameTime = 0
// 设置逐帧动画
app.ticker.add(() => {
  if (props.data.length === 0 || !isPlaying)
    return

  const now = performance.now()

  // 使用 frameRate 控制帧更新的时间间隔
  if (now - lastFrameTime >= 1000 / frameRate.value) {
    const currentTexture = textureMap.get(props.data[index.value])
    if (currentTexture) {
      sprite.texture = currentTexture

      // === 设置 sprite 尺寸自适应 ===
      const scaleX = app.screen.width / sprite.texture.width
      const scaleY = app.screen.height / sprite.texture.height
      const scale = Math.min(scaleX, scaleY) // 保持比例
      sprite.scale.set(scale)

      // 居中显示
      sprite.x = (app.screen.width - sprite.width) / 2
      sprite.y = (app.screen.height - sprite.height) / 2
    }

    // 切换帧
    index.value = (index.value + 1) % props.data.length

    // 如果不循环并且播放到最后一帧，则停止播放
    if (!props.loop && index.value === 0) {
      isPlaying = false
    }

    lastFrameTime = now // 更新最后更新时间
  }
})
// 开始播放动画
function startAnimation () {
  if (props.data.length > 0) {
    isPlaying = true
  }
}

// 停止动画
function stopAnimation () {
  isPlaying = false
}

// 使用 watchEffect 响应式更新数据
watchEffect(() => {
  if (props.data.length > 0) {
    startAnimation()
  }
  else {
    stopAnimation()
  }
})
</script>

<template>
  <slot></slot>
</template>
