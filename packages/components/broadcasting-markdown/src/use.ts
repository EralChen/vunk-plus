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
        console.debug('Audio ended for paragraph:', props.data.value.substring(0, 30) + '...')
        // theData.value.broadcast = Broadcast.ended
        emit('setData', {
          k: 'broadcast',
          v: Broadcast.stopped,
        })
        console.debug('Set paragraph broadcast to stopped after audio end')
        // 销毁实例
        setTimeout(() => {
          if (sound.value) {
            sound.value.unload()
            sound.value = null
          }
        }, 400)
        props.deferred.resolve(true)
        console.debug('Deferred resolved for paragraph')
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
    const paragraphPreview = props.data.value.substring(0, 30) + '...'
    console.debug(`Audio broadcast state changed to: ${broadcast.value} for paragraph: "${paragraphPreview}"`)
    console.debug('Sound instance exists:', !!sound.value, 'URL exists:', !!url.value)
    
    if (broadcast.value === Broadcast.play) {
      console.debug('Playing audio for paragraph:', paragraphPreview)
      if (sound.value) {
        sound.value.play()
        console.debug('Called sound.play()')
      } else {
        console.debug('ERROR: No sound instance available for play')
      }
    }
    else if (broadcast.value === Broadcast.pause) {
      console.debug('Pausing audio for paragraph:', paragraphPreview)
      sound.value?.pause()
    }
    else if (broadcast.value === Broadcast.stop) {
      console.debug('Stopping audio for paragraph:', paragraphPreview)
      sound.value?.stop()
    }
  })

  // 使用 Page Visibility API 检测页面可见性
  // const handleVisibilityChange = () => {
  //   if (document.hidden) {
  //     // 页面不可见（锁屏或切换到其他标签页）
  //     if (broadcast.value === Broadcast.playing) {
  //       emit('setData', {
  //         k: 'broadcast',
  //         v: Broadcast.pause,
  //       })
  //     }
  //   }
  //   else {
  //     // 页面可见
  //     setTimeout(() => {
  //       if (
  //         broadcast.value === Broadcast.paused
  //       ) {
  //         emit('setData', {
  //           k: 'broadcast',
  //           v: Broadcast.play,
  //         })
  //       }
  //     }, 400)
  //   }
  // }

  // onMounted(() => {
  //   // 添加事件监听器
  //   document.addEventListener('visibilitychange', handleVisibilityChange)
  // })
  // onBeforeUnmount(() => {
  //   // 移除事件监听器
  //   document.removeEventListener('visibilitychange', handleVisibilityChange)
  // })

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
