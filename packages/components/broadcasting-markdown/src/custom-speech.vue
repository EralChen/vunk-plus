<script lang="tsx">
import type { Deferred } from '@vunk/shared/promise'
import type { PropType } from 'vue'
import type { Paragraph } from './types'

import { useDeferred } from '@vunk/core/composables'
import { computed, defineComponent, onBeforeUnmount, onMounted, watch } from 'vue'
import { Broadcast, ParagraphStatus } from './const'
import SpeechError from './speech-error.vue'

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
    if (!value.trim()) {
      props.deferred.resolve(true)
      theData.value.broadcast = Broadcast.ended
      return () => null
    }

    /* init audio */
    const audioDef = useDeferred<HTMLAudioElement>()
    /* init audio END */

    /* addEventListener */
    audioDef.promise.then((audio) => {
      audio.addEventListener('playing', onPlaying)
      audio.addEventListener('pause', onPause)
      audio.addEventListener('error', onError)
      audio.addEventListener('ended', onEnded)
    })
    onBeforeUnmount(() => {
      audioDef.value?.removeEventListener('playing', onPlaying)
      audioDef.value?.removeEventListener('pause', onPause)
      audioDef.value?.removeEventListener('error', onError)
      audioDef.value?.removeEventListener('ended', onEnded)
    })
    function onPlaying () {
      theData.value.broadcast = Broadcast.playing
    }
    function onPause () {
      theData.value.broadcast = Broadcast.paused
    }
    function onError (err) {
      theData.value.broadcast = Broadcast.failed
      props.deferred.reject(err)
    }
    function onEnded () {
      theData.value.broadcast = Broadcast.ended
      props.deferred.resolve(true)
    }
    /* addEventListener end */

    onMounted(() => {
      watch(() => props.pause, (v) => {
        if (props.data.status === ParagraphStatus.pending) {
          if (v) {
            audioDef.value?.pause()
          }
          else {
            if (
              theData.value.broadcast === Broadcast.failed
              || theData.value.broadcast === Broadcast.initial
            ) {
              audioDef.promise.then((audio) => {
                audio.play().catch((err) => {
                  theData.value.broadcast = Broadcast.failed
                  props.deferred.reject(err)
                })
              })
            }
          }
        }
      }, { immediate: true })
    })

    return () => (
      <>
        {
          props.url && (
            <audio
              src={props.url}
              ref={audioDef.resolve}
            >
            </audio>
          )
        }

        {
          theData.value.status === ParagraphStatus.rejected
          && <SpeechError></SpeechError>
        }
      </>

    )
  },
})
</script>
