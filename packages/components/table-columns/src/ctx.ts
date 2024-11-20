import { PropType } from 'vue'
import { tableColumnProps } from './el-ctx'
import { Source } from './types'
export const props = {
  ...tableColumnProps,
  source: {
    type: Array as PropType<Source<any>[]>,
    default: () => ([]),
  },
}

