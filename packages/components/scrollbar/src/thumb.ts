import type { __ExtractPublicPropTypes, ExtractPropTypes } from 'vue'

import type Thumb from './thumb.vue'

export const thumbProps = {
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true as const,
  },
  always: Boolean,
}
export type ThumbProps = ExtractPropTypes<typeof thumbProps>
export type ThumbPropsPublic = __ExtractPublicPropTypes<typeof thumbProps>

export type ThumbInstance = InstanceType<typeof Thumb> & unknown
