<script lang="ts">
import type { Deferred } from '@vunk/shared/promise'
import type { PropType } from 'vue'
import type { Paragraph } from './types'
import { defineComponent, nextTick, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import { defaultRender, ParagraphStatus } from './const'

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
    if (!value.trim()) {
      // 直接 resolve
      props.deferred.resolve(true)
      return () => null
    }

    const utterThis = new SpeechSynthesisUtterance(value)

    utterThis.onend = function () {
      props.deferred.resolve(true)
    }
    utterThis.onerror = function (err) {
      props.deferred.reject(err)
    }
    utterThis.voice = props.voice

    if (props.data.start === 0) {
      window.speechSynthesis.cancel()
    }
    window.speechSynthesis.speak(utterThis)

    watch(() => props.pause, (v) => {
      if (props.data.status === ParagraphStatus.pending) {
        if (v) {
          window.speechSynthesis.pause()
        }
        else {
          window.speechSynthesis.resume()
        }
      }
    }, { immediate: true })

    return () => null
  },
})
</script>
