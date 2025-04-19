import type { SetDataEvent } from '@vunk/core'
import type { NormalObject } from '@vunk/shared'
import type { PropType } from 'vue'

export const props = {
  data: {
    type: Object as PropType<NormalObject>,
    default: undefined,
  },

}

export const emits = {
  setData: (e: SetDataEvent) => e,
}
