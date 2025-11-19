import type { ExtractPropTypes } from 'vue'

import type Bar from './bar.vue'

export const barProps = {
  always: {
    type: Boolean,
    default: true,
  },
  minSize: {
    type: Number,
    required: true as const,
  },
  hideAfter: {
    type: Number,
    default: 0,
  },
}
export type BarProps = ExtractPropTypes<typeof barProps>

export type BarInstance = InstanceType<typeof Bar> & unknown
