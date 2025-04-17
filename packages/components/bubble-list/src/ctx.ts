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
}

export const emits = {
}
