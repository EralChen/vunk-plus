import type { PropType } from 'vue'
import type { OnTextZone, SubmitRawEvent } from './types'

export const props = {

  speenchToTextUrl: {
    type: String,
    default: 'http://localhost:3000/speech-to-text',
  },
  /**
   * 自定义转为文本区域事件
   */
  onTextZone: {
    type: Function as PropType<OnTextZone>,
    default: undefined,
  },

  /**
   * 遮罩层 appendTo
   */
  appendTo: {
    type: null,
    default: 'body',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  submitText: (text: string) => typeof text === 'string',

  submit: (_: SubmitRawEvent) => true,
}
