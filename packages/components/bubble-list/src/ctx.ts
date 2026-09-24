import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { AnyFunc } from '@vunk/shared'
import type { PropType } from 'vue'
import { noop } from '@vunk/shared/function'

export const props = {
  items: {
    type: Array<any>,
    default: () => ([]),
  },
  elRef: {
    type: Function as PropType<AnyFunc>,
    default: noop,
  },

  scrollbarAppendTo: null,

  virtual: {
    type: Boolean,
    default: false,
  },

  /**
   * Key field name for virtual list items.
   * Defaults to 'key'. Set to 'id' or any other field your items use.
   */
  keyField: {
    type: String,
    default: 'key',
  },

  autoScrollThreshold: {
    type: Number,
    default: 200,
  },
}

export const emits = {
}
