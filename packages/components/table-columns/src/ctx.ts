import type { PropType } from 'vue'
import type { Source } from './types'
import { tableColumnProps } from './el-ctx'

export const props = {
  ...tableColumnProps,
  source: {
    type: Array as PropType<Source<any>[]>,
    default: () => ([]),
  },
}
