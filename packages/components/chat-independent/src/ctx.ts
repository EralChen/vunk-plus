import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { SetDataEvent } from '@vunk/core'
import type { PropType } from 'vue'
import type { SpeechToText, TextToSpeech } from './types'

export const props = {
  /**
   * @description BubbleList渲染时数据, 受控于setData
   */
  data: {
    type: Object as PropType<__VkBubbleList.RenderData>,
  },

  speechToText: {
    type: Function as PropType<SpeechToText>,
  },

  textToSpeech: {
    type: Function as PropType<TextToSpeech>,
  },

}

export const emits = {
  setData: (e: SetDataEvent) => e,
}
