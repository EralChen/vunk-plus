<script lang="tsx">
import { _VkBroadcastingMarkdownCtx, Broadcast, useHowlerParagraph } from '@vunk-plus/components/broadcasting-markdown'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    ..._VkBroadcastingMarkdownCtx.paragraphProps,
    send: {
      type: Function,
      required: true,
    },
  },
  emits: {
    ..._VkBroadcastingMarkdownCtx.paragraphEmits,
  },
  setup (props, { emit }) {
    const value = props.render(props.data.value)
    // 如果文本为空，则直接结束
    if (!value.trim()) {
      props.deferred.resolve(true)
      emit('setData', {
        k: 'broadcast',
        v: Broadcast.ended,
      })
      return () => null
    }

    const { broadcast, url } = useHowlerParagraph(props, emit)

    props.send(url.value)

    return () => null
  },
})
</script>
