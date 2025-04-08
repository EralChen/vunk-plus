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
}

export const emits = {
  submitText: (text: string) => typeof text === 'string',

  submit: (_: SubmitRawEvent) => true,
}
