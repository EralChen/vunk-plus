import type { NormalObject } from '@vunk/core'
import { TickerStatus } from '@vunk/shared/enum'
import { Howl } from 'howler'
import { computed, onBeforeUnmount, onMounted, shallowRef, watch, watchEffect } from 'vue'
import { Broadcast } from './const'

Howler.autoUnlock = false
/* init Howl */
const originalPlay = Howl.prototype.play
Howl.prototype.play = function (this: Howl, soundId?: number) {
  const WeixinJSBridge = (window as NormalObject).WeixinJSBridge
  WeixinJSBridge && WeixinJSBridge.invoke('getNetworkType', {}, () => {
    if (!this.playing(soundId)) {
      originalPlay.call(this, soundId)
    }
  }, false)
  return originalPlay.call(this, soundId)
}
/* init Howl END */

/**
 * @description 使用 Howler.js 播放段落
 */
export function useHowlerParagraph (
  props: {
    source: string
    status: TickerStatus
  },
  emit: ((e: 'update:status', status: TickerStatus) => void)
    & ((e: 'error', ev: any) => void),
) {
  // 使用ref保存Howl实例
  const sound = shallowRef<Howl | null>(null)
  const broadcast = computed({
    get: () => props.status,
    set: (val) => {
      emit('update:status', val)
    },
  })

  // 创建Howl实例的函数
  const createSound = (url: string) => {
    if (!url)
      return null

    // 销毁之前的实例
    if (sound.value) {
      sound.value.unload()
    }

    // 创建新的Howl实例
    return new Howl({
      src: [url],
      format: ['mp3', 'wav', 'aac'],

      // 事件处理
      onplay: () => {
        broadcast.value = TickerStatus.playing
      },
      onpause: () => {
        broadcast.value = TickerStatus.paused
      },
      onend: () => {
        // theData.value.broadcast = Broadcast.ended
        broadcast.value = TickerStatus.stopped
        // 销毁实例
        setTimeout(() => {
          if (sound.value) {
            sound.value.unload()
            sound.value = null
          }
        }, 400)
      },
      onstop: () => {
        broadcast.value = TickerStatus.stopped
      },
      onloaderror: (_, error) => {
        broadcast.value = TickerStatus.failed
        emit('error', error)
      },
      onplayerror: (_, error) => {
        broadcast.value = TickerStatus.failed
        emit('error', error)
      },
    })
  }

  const url = computed(() => props.source)

  // URL变化时重新创建Howl实例
  watch(() => url.value, (newUrl) => {
    if (newUrl) {
      sound.value = createSound(newUrl)
    }
  }, { immediate: true })

  // 组件销毁时清理资源
  onBeforeUnmount(() => {
    if (sound.value) {
      sound.value.unload()
      sound.value = null
    }
  })

  watchEffect(() => {
    if (broadcast.value === Broadcast.play) {
      if (sound.value) {
        sound.value.play()
      }
      else {
        console.warn('warn: No sound instance available for play')
      }
    }
    else if (broadcast.value === Broadcast.pause) {
      sound.value?.pause()
    }
    else if (broadcast.value === Broadcast.stop) {
      sound.value?.stop()
    }
  })

  return {
    url,
    broadcast,
    sound,
  }
}

/**
 * @description 获取浏览器语音列表
 */
export function useVoices () {
  /* 浏览器语音列表 */
  const voices = shallowRef<SpeechSynthesisVoice[]>([])

  onMounted(() => {
    rPopulateVoiceList()
    window.speechSynthesis.onvoiceschanged = rPopulateVoiceList
  })
  function rPopulateVoiceList () {
    if (typeof window.speechSynthesis === 'undefined') {
      return
    }
    voices.value = window.speechSynthesis.getVoices()
  }

  return {
    voices,
  }
}
