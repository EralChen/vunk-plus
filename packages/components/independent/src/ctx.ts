import type { __VkRecorderButton } from '@vunk-plus/components/recorder-button'
import type { SetDataEvent } from '@vunk/core'
import type { NormalObject } from '@vunk/shared'
import type { PropType } from 'vue'

export const props = {
  data: {
    type: Object as PropType<NormalObject>,
    default: undefined,
  },

  speechToText: {
    type: Function as PropType<__VkRecorderButton.SpeechToText>,
    default: undefined,
  },

}

export const emits = {
  setData: (e: SetDataEvent) => e,
}
