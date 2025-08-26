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
}

export const emits = {
}
