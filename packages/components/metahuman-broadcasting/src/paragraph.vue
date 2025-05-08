<script lang="tsx">
import type { SetDataEvent } from '@vunk/core'
import type { Deferred } from '@vunk/shared/promise'
import type { Paragraph } from './types'
import { _VkBroadcastingMarkdownCtx, Broadcast, useHowlerParagraph } from '@vunk-plus/components/broadcasting-markdown'
import { defineComponent, onMounted, watchEffect } from 'vue'

export default defineComponent({
  props: {
    ..._VkBroadcastingMarkdownCtx.paragraphProps,
  },
  emits: {
    // ..._VkBroadcastingMarkdownCtx.paragraphEmits,
    setData: (e: SetDataEvent<keyof Paragraph>) => e,
    load: (e: {
      data: Paragraph
      deferred: Deferred<any>
    }) => e,
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

    useHowlerParagraph(props, emit)

    onMounted(() => {
      emit('setData', {
        k: 'broadcast',
        v: Broadcast.play,
      })

      emit('load', {
        data: props.data,
        deferred: props.deferred,
      })
    })

    return () => null
  },
})
</script>
