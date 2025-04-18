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

  /**
   * @description 组件内会根据当前游标是否和 source 长度一致来判断，是否持续阅读, 当一致时，会关闭阅读状态。但若设置为 true，则会持续阅读, 这在动态接收数据时会有用
   */
  keepRead: {
    type: Boolean,
    default: false,
  },

}

export const emits = {
  setData: (e: SetDataEvent) => e,
}
