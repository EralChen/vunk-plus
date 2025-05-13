<script lang="tsx">
import { computed, defineComponent, onMounted } from 'vue'
import { Broadcast, ParagraphStatus } from './const'
import { paragraphEmits, paragraphProps } from './ctx'
import SpeechError from './speech-error.vue'
import { useHowlerParagraph } from './use'

export default defineComponent({
  components: {
    SpeechError,
  },
  props: paragraphProps,
  emits: paragraphEmits,
  setup (props, { emit }) {
    const value = props.render(props.data.value)
    const theData = computed(() => props.data)
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
