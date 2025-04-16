export const props = {

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
    default: true,
  },

}

export const emits = {
}
