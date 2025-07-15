import type { NormalObject, SetDataEvent } from '@vunk/core'
import type { } from '@vunk/shared/enum'
import type { Deferred } from '@vunk/shared/promise'
import type { Paragraph } from './types'
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
    data: Paragraph
    deferred: Deferred<any>
  },
  emit: (e: 'setData', data: SetDataEvent<keyof Paragraph>) => void,
) {
  // 使用ref保存Howl实例
  const sound = shallowRef<Howl | null>(null)

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
        // theData.value.broadcast = Broadcast.playing
        emit('setData', {
          k: 'broadcast',
          v: Broadcast.playing,
        })
      },
      onpause: () => {
        // theData.value.broadcast = Broadcast.paused
        emit('setData', {
          k: 'broadcast',
          v: Broadcast.paused,
        })
      },
      onend: () => {
        // theData.value.broadcast = Broadcast.ended
        emit('setData', {
          k: 'broadcast',
          v: Broadcast.stopped,
        })

        // 销毁实例
        setTimeout(() => {
          if (sound.value) {
            sound.value.unload()
            sound.value = null
          }
        }, 400)
        props.deferred.resolve(true)
      },
      onstop: () => {
        emit('setData', {
          k: 'broadcast',
          v: Broadcast.stopped,
        })
      },
      onloaderror: (_, error) => {
        // theData.value.broadcast = Broadcast.failed
        emit('setData', {
          k: 'broadcast',
          v: Broadcast.failed,
        })
        props.deferred.reject(error)
      },
      onplayerror: (_, error) => {
        // theData.value.broadcast = Broadcast.failed
        emit('setData', {
          k: 'broadcast',
          v: Broadcast.failed,
        })
        props.deferred.reject(error)
      },
    })
  }

  const url = computed(() => props.data.url)
  const broadcast = computed(() => props.data.broadcast)

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
