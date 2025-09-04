import type { __ExtractPublicPropTypes, ExtractPropTypes } from 'vue'

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
}
export type BarProps = ExtractPropTypes<typeof barProps>
export type BarPropsPublic = __ExtractPublicPropTypes<typeof barProps>

export type BarInstance = InstanceType<typeof Bar> & unknown
