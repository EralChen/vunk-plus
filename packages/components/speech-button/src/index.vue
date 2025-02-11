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
    const { openOrStart, recording, stop, opening } = useRecorder()

    const handleClick = () => {
      if (props.disabled || opening.value)
        return

      if (recording.value) {
        stop().then((blob) => {
          emit('stop', blob)
        })
      }
      else {
        openOrStart().then((v) => {
          if (v)
            emit('start')
        })
      }
    }

    const iconRender = () => {
      if (props.disabled)
        return <AudioMutedOutlined />
      if (opening.value)
        return <AudioOutlined spin />

      if (recording.value) {
        return (
          <RecordingIcon
            class="vk-speech-button-recording-icon"
          />
        )
      }
      return <AudioOutlined />
    }

    return () => (
      <Button
        onClick={handleClick}
        class="vk-speech-button"
      >
        {{
          icon: iconRender,
        }}
      </Button>
    )
  },
})
</script>

<style>
.vk-speech-button{
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.vk-speech-button-recording-icon{
  height: 1.2em;
  width: 1.2em;
  vertical-align: top;
}
</style>
