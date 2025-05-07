<script lang="tsx">
import { computed, defineComponent } from 'vue'
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
      theData.value.broadcast = Broadcast.ended
      return () => null
    }

    useHowlerParagraph(props, emit)

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
