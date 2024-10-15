
export const props = {
  source: {
    type: String,
    default: '',
  },
  delay: {
    type: Number,
    default: 60,
  },
  // 暂停
  pause: {
    type: Boolean,
    default: false,
  },
  /**
   * 禁用typing
   */
  disabled: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  typing: null,
}

