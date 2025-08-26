import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { DefaultRow } from 'element-plus/es/components/table/src/table/defaults'
import type { PropType } from 'vue'
import { bindPropsFactory } from '@vunk/core/shared/utils-vue'

export const tableColumnProps = {
  type: {
    type: String,
    default: 'default',
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: '',
  },
  renderHeader: Function as PropType<
    TableColumnCtx<DefaultRow>['renderHeader']
  >,
  sortable: {
    type: [Boolean, String],
    default: false,
  },
  sortMethod: Function as PropType<TableColumnCtx<DefaultRow>['sortMethod']>,
  sortBy: [String, Function, Array] as PropType<
    TableColumnCtx<DefaultRow>['sortBy']
  >,
  resizable: {
    type: Boolean,
    default: true,
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function as PropType<TableColumnCtx<DefaultRow>['formatter']>,
  selectable: Function as PropType<TableColumnCtx<DefaultRow>['selectable']>,
  reserveSelection: Boolean,
  filterMethod: Function as PropType<
    TableColumnCtx<DefaultRow>['filterMethod']
  >,
  filteredValue: Array as PropType<TableColumnCtx<DefaultRow>['filteredValue']>,
  filters: Array as PropType<TableColumnCtx<DefaultRow>['filters']>,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true,
  },
  index: [Number, Function] as PropType<TableColumnCtx<DefaultRow>['index']>,
  sortOrders: {
    type: Array as PropType<TableColumnCtx<DefaultRow>['sortOrders']>,
    default: () => {
      return ['ascending', 'descending', null]
    },
    validator: (val: TableColumnCtx<any>['sortOrders']) => {
      return val.every((order: string | null) =>
        ['ascending', 'descending', null].includes(order),
      )
    },
  },
}
export const createTableColumnBindProps = bindPropsFactory(tableColumnProps)
