<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { TickerStatus } from '@vunk/shared/enum'
import { Assets, Sprite } from 'pixi.js'
import { onBeforeUnmount, ref, useId, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { usePixiApp } from './use'

const props = defineProps(dProps)
const emit = defineEmits(emits)
const { application: app, context } = usePixiApp()
const compId = useId()

// 视频相关状态
const sprite = new Sprite()
const texture = ref<Texture | null>(null)
const isVideoReady = ref(false)
const videoError = ref<string>('')
const isLoading = ref(false)

// 将精灵添加到舞台
app.stage.addChild(sprite)

// 等待 PIXI 应用准备就绪
context.when().then((app) => {
  app.renderer.on('resize', () => {
    resizeSprite()
  })
})

// 调整精灵尺寸以适应容器
function resizeSprite () {
  if (!app.renderer?.screen || !sprite.texture) {
    return
  }

  // 计算缩放比例，保持宽高比
  const scaleX = app.screen.width / sprite.texture.width
  const scaleY = app.screen.height / sprite.texture.height
  const scale = Math.min(scaleX, scaleY)

  sprite.scale.set(scale)

  // 居中显示
  sprite.x = (app.screen.width - sprite.width) / 2
  sprite.y = (app.screen.height - sprite.height) / 2
}

// 获取视频元素
function getVideoElement (texture: any): HTMLVideoElement | null {
  // 根据 PIXI.js 8.x 的结构获取视频元素
  if (texture.source && texture.source.resource) {
    const resource = texture.source.resource
    if (resource instanceof HTMLVideoElement) {
      return resource
    }
  }
  return null
}

// 使用 Assets 系统加载视频纹理
async function loadVideoTexture (url: string) {
  try {
    isLoading.value = true
    videoError.value = ''

    // 为视频创建唯一的别名
    const alias = `${compId}-video`

    // 清理旧的 Asset
    if (Assets.cache.has(alias)) {
      await Assets.unload(alias)
    }

    // 添加到 Assets 系统
    Assets.add({ alias, src: url })

    // 加载视频纹理
    const videoTexture = await Assets.load(alias)

    texture.value = videoTexture
    sprite.texture = videoTexture

    // 获取视频元素并设置属性
    const video = getVideoElement(videoTexture)
    if (video) {
      video.loop = props.loop
      video.muted = true
      video.crossOrigin = 'anonymous'

      // 设置视频事件监听器
      setupVideoEvents(video)
    }

    isVideoReady.value = true
    isLoading.value = false
    resizeSprite()

    return videoTexture
  }
  catch (error) {
    console.error('加载视频纹理失败:', error)
    videoError.value = '视频加载失败'
    isLoading.value = false
    isVideoReady.value = false
    return null
  }
}

// 设置视频事件监听器
function setupVideoEvents (video: HTMLVideoElement) {
  // 播放开始
  video.addEventListener('play', () => {
    if (props.status !== TickerStatus.playing) {
      emit('update:status', TickerStatus.playing)
    }
  })

  // 暂停
  video.addEventListener('pause', () => {
    if (props.status !== TickerStatus.paused) {
      emit('update:status', TickerStatus.paused)
    }
  })

  // 播放结束
  video.addEventListener('ended', () => {
    if (props.loop) {
      video.currentTime = 0
      video.play()
    }
    else {
      emit('update:status', TickerStatus.stopped)
    }
  })

  // 错误处理
  video.addEventListener('error', (e) => {
    const error = video.error
    let errorMessage = '视频播放失败'

    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          errorMessage = '视频播放被中止'
          break
        case error.MEDIA_ERR_NETWORK:
          errorMessage = '网络错误导致视频播放失败'
          break
        case error.MEDIA_ERR_DECODE:
          errorMessage = '视频解码失败'
          break
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = '不支持的视频格式'
          break
      }
    }

    console.error('视频播放错误:', errorMessage, e)
    videoError.value = errorMessage
    emit('update:status', TickerStatus.stopped)
  })
}

// 播放控制
function play () {
  if (!isVideoReady.value || !texture.value)
    return

  const video = getVideoElement(texture.value)
  if (video) {
    video.play().catch((error) => {
      console.error('视频播放失败:', error)
      videoError.value = '视频播放失败'
    })
  }
}

function pause () {
  if (!texture.value)
    return

  const video = getVideoElement(texture.value)
  if (video) {
    video.pause()
  }
}

function stop () {
  if (!texture.value)
    return

  const video = getVideoElement(texture.value)
  if (video) {
    video.pause()
    video.currentTime = 0
  }
  emit('update:status', TickerStatus.stopped)
}

// 清理视频资源
async function cleanupVideo () {
  if (texture.value) {
    const alias = `${compId}-video`

    // 销毁纹理
    texture.value.destroy(true)
    texture.value = null

    // 从 Assets 缓存中卸载
    if (Assets.cache.has(alias)) {
      await Assets.unload(alias)
    }
  }

  // 重置状态
  isVideoReady.value = false
  videoError.value = ''
  isLoading.value = false
}

// 监听 URL 变化
watchEffect(() => {
  if (props.url) {
    loadVideoTexture(props.url)
  }
  else {
    cleanupVideo()
  }
})

// 监听循环播放设置变化
watchEffect(() => {
  if (texture.value) {
    const video = getVideoElement(texture.value)
    if (video) {
      video.loop = props.loop
    }
  }
})

// 监听播放状态变化
watchEffect(() => {
  if (!isVideoReady.value)
    return

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
onBeforeUnmount(() => {
  cleanupVideo()

  // 从舞台移除精灵
  if (sprite && app.stage) {
    app.stage.removeChild(sprite)
  }
})
</script>

<template>
  <div v-if="videoError" class="video-error">
    <p>{{ videoError }}</p>
  </div>
  <div v-else-if="isLoading" class="video-loading">
    <p>加载视频中...</p>
  </div>
  <slot v-else></slot>
</template>

<style scoped>
.video-error,
.video-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  text-align: center;
}

.video-error {
  color: #ff4444;
}

.video-loading {
  color: #666;
}

.video-error p,
.video-loading p {
  margin: 0;
  padding: 20px;
  border-radius: 4px;
}

.video-error p {
  background-color: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
}

.video-loading p {
  background-color: rgba(102, 102, 102, 0.1);
  border: 1px solid rgba(102, 102, 102, 0.3);
}
</style>
