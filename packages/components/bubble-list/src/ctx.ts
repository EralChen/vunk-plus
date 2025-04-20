import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { AnyFunc } from '@vunk/shared'
import type { PropType } from 'vue'
import type { Item } from './types'
import { noop } from '@vunk/shared/function'

export const props = {
  items: {
    type: Array<Item>,
    default: () => ([]),
  },
  elRef: {
    type: Function as PropType<AnyFunc>,
    default: noop,
  },

  textToSpeech: {
    type: Function as PropType<__VkBroadcastingMarkdown.TextToSpeech>,
  },
}

export const emits = {
}
