<script lang="ts">
import type { Deferred } from '@vunk/shared/promise'
import type { PropType } from 'vue'
import type { Paragraph } from './types'
import { computed, defineComponent, onMounted, watch } from 'vue'
import { Broadcast, defaultRender, ParagraphStatus } from './const'

export default defineComponent({
  props: {
    voice: {
      type: null as unknown as PropType<SpeechSynthesisVoice>,
      required: true,
    },
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
  },
  setup (props) {
    const value = defaultRender(props.data.value)
      .replace(/\n/g, '')
    const theData = computed(() => {
      return props.data
    })
    if (!value.trim()) {
      // 直接 resolve
      props.deferred.resolve(true)
      theData.value.broadcast = Broadcast.ended
      return () => null
    }

    if (props.data.start === 0) {
      window.speechSynthesis.pause()
      window.speechSynthesis.cancel()
    }

    const utterThis = new SpeechSynthesisUtterance(value)

    utterThis.onend = function () {
      props.deferred.resolve(true)
      theData.value.broadcast = Broadcast.ended
    }

    utterThis.onstart = function () {
      theData.value.broadcast = Broadcast.playing
    }

    utterThis.onerror = function (err) {
      props.deferred.reject(err)
      theData.value.broadcast = Broadcast.failed
      window.speechSynthesis.cancel()
    }
    utterThis.voice = props.voice

    window.speechSynthesis.speak(utterThis)

    onMounted(() => {
      watch(() => props.pause, (v) => {
        if (props.data.status === ParagraphStatus.pending) {
          if (v) {
            if (theData.value.broadcast === Broadcast.playing) {
              window.speechSynthesis.pause()
              theData.value.broadcast = Broadcast.paused
            }
          }
          else {
            window.speechSynthesis.resume()
            if (theData.value.broadcast === Broadcast.paused) {
              theData.value.broadcast = Broadcast.playing
            }
          }
        }
      }, { immediate: true })
    })

    return () => null
  },
})
</script>
