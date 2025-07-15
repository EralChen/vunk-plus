import type { MarkdownItAsync } from 'markdown-it-async'
import type { PropType } from 'vue'

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

  /**
   *  @description markdown-it 配置
   */
  markdownItSetup: {
    type: Function as PropType<
      (md: MarkdownItAsync) => void
    >,
    default: null,
  },

  finished: {
    type: Boolean,
  },

  loading: {
    type: Boolean,
    default: false,
  },

}

export const emits = {
  'typing': null,
  'update:finished': null,
}
