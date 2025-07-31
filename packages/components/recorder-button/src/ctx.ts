import type { PropType } from 'vue'
import type { OnTextZone, SpeechToText, SubmitRawEvent } from './types'

export const props = {
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

  /**
   * 语音转文本函数
   */
  speechToText: {
    type: Function as PropType<SpeechToText>,
    default: undefined,
  },

  /**
   * @description 是否直接使用提交文本输出
   */
  submitToText: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  submitText: (text: string) => typeof text === 'string',

  submit: (_: SubmitRawEvent) => true,

  error: (_: Error) => true,
}
