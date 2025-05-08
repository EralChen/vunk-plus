<script lang="tsx">
import type { SetDataEvent } from '@vunk/core'
import type { Paragraph } from './types'
import { _VkBroadcastingMarkdownCtx, Broadcast, useHowlerParagraph } from '@vunk-plus/components/broadcasting-markdown'
import { defineComponent, watchEffect } from 'vue'

export default defineComponent({
  props: {
    ..._VkBroadcastingMarkdownCtx.paragraphProps,
    send: {
      type: Function,
      required: true,
    },
  },
  emits: {
    // ..._VkBroadcastingMarkdownCtx.paragraphEmits,
    setData: (e: SetDataEvent<keyof Paragraph>) => e,
  },
  setup (props, { emit }) {
    const value = props.render(props.data.value)
    // 如果文本为空，则直接结束
    if (!value.trim()) {
      props.deferred.resolve(true)
      emit('setData', {
        k: 'broadcast',
        v: Broadcast.stopped,
      })
      return () => null
    }

    const { url, sound } = useHowlerParagraph(props, emit)
    watchEffect(() => {
      if (sound.value) {
        emit('setData', {
          k: 'sound',
          v: sound.value,
        })
      }
    })

    props.send?.(url.value)

    return () => null
  },
})
</script>
