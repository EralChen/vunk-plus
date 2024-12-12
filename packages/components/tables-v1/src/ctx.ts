import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import { pickObject } from '@vunk/core/shared/utils-object'
import { 
  paginationEmits,
  paginationProps,
} from 'element-plus'
import { CSSProperties, PropType } from 'vue'
import { Column } from './types'
import { _VkTableColumnsElCtx } from '@vunk/skzz/components/table-columns'
import { tableProps as _tableProps, tableEmits } from './el-ctx'
import { AnyFunc } from '@vunk/core'

export const createPaginationBindProps = bindPropsFactory(paginationProps)

export const createPaginationOnEmits = onEmitsFactory(paginationEmits)


const tableProps = pickObject(_tableProps, {
  excludes: ['style', 'className'],
})
export const createTableBindProps = bindPropsFactory(tableProps)


export const props = {
  ..._VkTableColumnsElCtx.tableColumnProps,
  ...paginationProps,
  ...tableProps,
  border: {
    type: Boolean,
    default: true,
  },
  tableClass: {
    type: String,
    default: '',
  },
  tableStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  layout: {
    type: String,
    default: undefined,
  },

  start: {
    type: Number,
    default: undefined,
  },
  
  pageSize: {
    type: Number,
    default: 10,
  },

  currentPage: {
    type: Number,
    default: 1,
  },

  columns: {
    type: Array as PropType<Column<any>[]>,
    default: () => [],
  },

  modules: {
    type: Array as PropType<('pagination')[]>,
    default: () => ['pagination'],
  },
  
  /*   
    :align="'center'"
    :headerAlign="'center'"
  */
  align: {
    type: String,
    default: 'center',
  },
  headerAlign: {
    type: String,
    default: 'center',
  },
  
  elRef: {
    type: Function as PropType<AnyFunc>,
    default: undefined,
  },

}

export const createBindProps = bindPropsFactory(props)


export const emits = {
  ...paginationEmits,
  ...tableEmits,
  'update:start': (val: number) => typeof val === 'number',
}

export const createOnEmits = onEmitsFactory(emits)

