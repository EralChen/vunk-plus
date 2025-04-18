import type { SetDataEvent } from '@vunk/core'
import type { Paragraph } from './types'

export const props = {

  /**
   *  @description 段落详情
   */
  data: {
    type: Array<Paragraph>,
    default: undefined,
  },

  /**
   * @description 是否使用 web speech api
   */
  webSpeech: {
    type: Boolean,
    default: true,
  },

  /**
   * @description md 文本
   */
  source: {
    type: String,
    default: '',
  },

  /**
   *  @description 延迟
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

}

export const emits = {
  setData: (e: SetDataEvent) => e,
}
