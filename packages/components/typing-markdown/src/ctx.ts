import type { Func } from "@vunk/core"
import type MarkdownIt from "markdown-it"
import { PropType } from "vue"

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
      (md: MarkdownIt) => void
    >,
    default: null,
  }
  
}

export const emits = {
  typing: null,
}

