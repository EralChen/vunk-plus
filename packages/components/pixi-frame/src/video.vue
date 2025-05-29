<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { useDeferred } from '@vunk/core/composables'
import { TickerStatus } from '@vunk/shared/enum'
import { Assets, Sprite } from 'pixi.js'
import { computed, onBeforeUnmount, onMounted, ref, useId, watchEffect } from 'vue'
import { props as dProps, emits } from './ctx'
import { usePixiApp } from './use'

const props = defineProps({
  ...dProps,
  url: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(emits)
const { application: app, context } = usePixiApp()
const compId = useId()

// 视频相关状态
const sprite = new Sprite()
const texture = ref<Texture>()
const video = computed(() => {
  if (texture.value?.source && texture.value.source.resource) {
    const resource = texture.value.source.resource
    if (resource instanceof HTMLVideoElement) {
      return resource
    }
  }
  return null
})
const readyDef = useDeferred()
const videoError = ref('')

readyDef.promise.then(() => {
  if (props.status === TickerStatus.play) {
    play()
  }
})

// 将精灵添加到舞台
app.stage.addChild(sprite)

// 等待 PIXI 应用准备就绪
context.when().then((app) => {
  app.renderer.on('resize', () => {
    resizeSprite()
  })
})

onMounted(() => loadVideoTexture(props.url))

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
// 使用 Assets 系统加载视频纹理
async function loadVideoTexture (url: string) {
  try {
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

    if (video.value) {
      video.value.loop = props.loop
      video.value.muted = true
      video.value.crossOrigin = 'anonymous'
      // 设置视频事件监听器
      setupVideoEvents(video.value)

      readyDef.resolve()
    }

    resizeSprite()

    return videoTexture
  }
  catch (error) {
    console.error('加载视频纹理失败:', error)
    videoError.value = '视频加载失败'
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
  if (video.value) {
    video.value.play().catch((error) => {
      console.error('视频播放失败:', error)
      videoError.value = '视频播放失败'
    })
  }
}

function pause () {
  video.value?.pause()
}

function stop () {
  if (video.value) {
    video.value.pause()
    video.value.currentTime = 0
  }
  emit('update:status', TickerStatus.stopped)
}

// 清理视频资源
async function cleanupVideo () {
  if (texture.value) {
    const alias = `${compId}-video`

    // 销毁纹理
    texture.value.destroy(true)
    texture.value = undefined

    // 从 Assets 缓存中卸载
    if (Assets.cache.has(alias)) {
      await Assets.unload(alias)
    }
  }

  // 重置状态
  videoError.value = ''
}

// 监听循环播放设置变化
watchEffect(() => {
  video.value && (video.value.loop = props.loop)
})

// 监听播放状态变化
watchEffect(() => {
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
  <slot></slot>
</template>
