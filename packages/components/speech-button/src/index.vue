<script lang="tsx">
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons-vue'
import { useRecorder } from '@vunk-plus/composables/recorder'
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'
import RecordingIcon from './RecordingIcon.vue'

export default defineComponent({
  name: 'VkSpeechButton',
  components: {
    RecordingIcon,
  },
  props,
  emits,
  setup (props, { emit }) {
    const { openOrStart, recording, stop } = useRecorder()

    const handleClick = () => {
      if (props.disabled)
        return

      if (recording.value) {
        stop().then((blob) => {
          console.log(blob)
        })
      }

      else {
        // start
        openOrStart()
      }
    }

    return () => (
      <Button
        onClick={handleClick}
      >
        {{
          icon: () => recording.value
            ? <RecordingIcon />
            : props.disabled
              ? <AudioMutedOutlined />
              : <AudioOutlined />,
        }}
      </Button>
    )
  },
})
</script>
