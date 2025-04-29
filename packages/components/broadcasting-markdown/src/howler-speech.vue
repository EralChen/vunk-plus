<script lang="tsx">
import type { NormalObject } from '@vunk/shared'
import type { Deferred } from '@vunk/shared/promise'
import type { PropType } from 'vue'

import type { Paragraph } from './types'
import { Howl } from 'howler'
import { computed, defineComponent, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { Broadcast, ParagraphStatus } from './const'
import SpeechError from './speech-error.vue'

const originalPlay = Howl.prototype.play
Howl.prototype.play = function (this: Howl, soundId?: number) {
  const WeixinJSBridge = (window as NormalObject).WeixinJSBridge
  WeixinJSBridge && WeixinJSBridge.invoke('getNetworkType', {}, () => {
    originalPlay.call(this, soundId)
  }, false)
  return originalPlay.call(this, soundId)
}
export default defineComponent({
  components: {
    SpeechError,
  },
  props: {
    data: {
      type: Object as PropType<Paragraph>,
      default: () => ({}),
    },
    deferred: {
      type: Object as PropType<Deferred<any>>,
      required: true,
    },
    pause: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 语音资源路径
     */
    url: {
      type: String,
      default: '',
    },
    render: {
      type: Function as PropType<(text: string) => string>,
      required: true,
    },
  },
  setup (props) {
    const value = props.render(props.data.value)
    const theData = computed(() => props.data)

    // 如果文本为空，则直接结束
    if (!value.trim()) {
      props.deferred.resolve(true)
      theData.value.broadcast = Broadcast.ended
      return () => null
    }

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
          theData.value.broadcast = Broadcast.playing
        },
        onpause: () => {
          theData.value.broadcast = Broadcast.paused
        },
        onend: () => {
          theData.value.broadcast = Broadcast.ended
          // 销毁实例
          setTimeout(() => {
            if (sound.value) {
              sound.value.unload()
              sound.value = null
            }
          }, 400)
          props.deferred.resolve(true)
        },
        onloaderror: (_, error) => {
          theData.value.broadcast = Broadcast.failed
          props.deferred.reject(error || new Error('Failed to load audio'))
        },
        onplayerror: (_, error) => {
          theData.value.broadcast = Broadcast.failed
          console.error('Failed to play audio', error)
          props.deferred.reject(error || new Error('Failed to play audio'))
        },
      })
    }

    // URL变化时重新创建Howl实例
    watch(() => props.url, (newUrl) => {
      if (newUrl) {
        sound.value = createSound(newUrl)
      }
    }, { immediate: true })

    // 监听暂停状态
    onMounted(() => {
      watch(() => props.pause, (isPaused) => {
        if (props.data.status === ParagraphStatus.pending) {
          if (isPaused) {
            // 暂停播放
            if (sound.value && sound.value.playing()) {
              sound.value.pause()
            }
          }
          else {
            // 开始或恢复播放
            if (
              theData.value.broadcast === Broadcast.failed
              || theData.value.broadcast === Broadcast.initial
            ) {
              if (sound.value) {
                sound.value.play()
              }
            }
            else if (theData.value.broadcast === Broadcast.paused) {
              if (sound.value) {
                sound.value.play()
              }
            }
          }
        }
      }, { immediate: true })
    })

    // 组件销毁时清理资源
    onBeforeUnmount(() => {
      if (sound.value) {
        sound.value.unload()
        sound.value = null
      }
    })

    return () => (
      <>
        {
          theData.value.status === ParagraphStatus.rejected
          && <SpeechError></SpeechError>
        }
      </>
    )
  },
})
</script>
