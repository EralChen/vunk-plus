import type { SetDataEvent } from '@vunk/core'
import type { PropType } from 'vue'
import type { Paragraph, TextToSpeech } from './types'
import { defaultRender } from './const'

export const props = {

  /**
   * @description md文本转纯文本的函数
   */
  render: {
    type: Function as PropType<(text: string) => string>,
    default: defaultRender,
  },

  /**
   *  @description 段落详情
   */
  data: {
    type: Array<Paragraph>,
    default: undefined,
  },

  /**
   * @description md 文本
   */
  source: {
    type: String,
    default: '',
  },

  /**
   *  @description 游标阅读延迟
   */
  delay: {
    type: Number,
    default: 0,
  },

  /**
   * @description 段落切割符号
   */
  separators: {
    type: Array<string>,
    default: () => ['\n\n', '\n'],
  },

  /**
   * @description 暂停的
   */
  pause: {
    type: Boolean,
    default: false,
  },

  /**
   * @description 组件内会根据当前游标是否和 source 长度一致来判断，是否持续阅读, 当一致时，会关闭阅读状态。但若设置为 true，则会持续阅读, 这在动态接收数据时会有用
   */
  keepRead: {
    type: Boolean,
    default: false,
  },

  /**
   * @description 是否使用 web speech api
   */
  webSpeech: {
    type: Boolean,
    default: false,
  },

  /**
   * @description 是否使用自定义语音合成
   */
  textToSpeech: {
    type: Function as PropType<TextToSpeech>,
    default: undefined,
  },

}

export const emits = {
  'setData': (e: SetDataEvent) => e,
  'update:broadcasting': (_: boolean) => true,
  'update:completed': (_: boolean) => true,
  'update:error': (_: boolean) => true,
}
