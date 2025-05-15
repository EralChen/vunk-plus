import type { AnyFunc } from '@vunk/core'
import type { CSSProperties, PropType } from 'vue'
import type { Column } from './types'
import { _VkTableColumnsElCtx } from '@vunk-plus/components/table-columns'
import { pickObject } from '@vunk/core/shared/utils-object'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import {
  paginationEmits,
  paginationProps,
} from 'element-plus'
import { tableProps as _tableProps, tableEmits } from './el-ctx'

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

  pageSize: {
    type: Number,
    default: 10,
  },

  currentPage: {
    type: Number,
    default: 1,
  },

  /**
   * @description 表示偏移量 v-model:start 和 v-model:currentPage 二选一
   */
  start: {
    type: Number,
    default: undefined,
  },

  /**
   * @description 表格列
   * @link ./table-columns
   */
  columns: {
    type: Array as PropType<Column[]>,
    default: () => [],
  },

  /**
   * @description 组件模块。
   * 如无需分页，可传入 `:modules="[]"`
   */
  modules: {
    type: Array as PropType<('pagination')[]>,
    default: () => ['pagination'],
  },

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

  /**
   * @description 若为 false, 表格根据其内容高度自适应; 依赖 "@vunk/core": ">=1.4.6"
   */
  duplexFull: {
    type: Boolean,
    default: true,
  },

}

export const createBindProps = bindPropsFactory(props)

export const emits = {
  ...paginationEmits,
  ...tableEmits,
  'update:start': (val: number) => typeof val === 'number',
}

export const createOnEmits = onEmitsFactory(emits)
