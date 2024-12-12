
import type {
  CSSProperties,
  PropType,
} from 'vue'
import { TableProps, useSizeProp } from 'element-plus'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'

export const componentSizes = ['', 'default', 'small', 'large'] as const

export type ComponentSize = typeof componentSizes[number]


export type DefaultRow = any


type Layout = 'fixed' | 'auto'

export interface Sort {
  prop: string
  order: 'ascending' | 'descending'
  init?: any
  silent?: any
}



export interface TreeNode {
  expanded?: boolean
  loading?: boolean
  noLazyChildren?: boolean
  indent?: number
  level?: number
  display?: boolean
}


export const tableProps ={
    /**
   * @description table data
   */
    data: {
      type: Array as PropType<DefaultRow[]>,
      default: () => [],
    },
    /**
     * @description size of Table
     */
    size: useSizeProp,
    width: [String, Number],
    /**
     * @description table's height. By default it has an `auto` height. If its value is a number, the height is measured in pixels; if its value is a string, the value will be assigned to element's style.height, the height is affected by external styles
     */
    height: [String, Number],
    /**
     * @description table's max-height. The legal value is a number or the height in px
     */
    maxHeight: [String, Number],
    /**
     * @description whether width of column automatically fits its container
     */
    fit: {
      type: Boolean,
      default: true,
    },
    /**
     * @description whether Table is striped
     */
    stripe: Boolean,
    /**
     * @description whether Table has vertical border
     */
    border: Boolean,
    /**
     * @description key of row data, used for optimizing rendering. Required if `reserve-selection` is on or display tree data. When its type is String, multi-level access is supported, e.g. `user.info.id`, but `user.info[0].id` is not supported, in which case `Function` should be used
     */
    rowKey: [String, Function] as PropType<TableProps<DefaultRow>['rowKey']>,
    /**
     * @description whether Table header is visible
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * @description whether to display a summary row
     */
    showSummary: Boolean,
    /**
     * @description displayed text for the first column of summary row
     */
    sumText: String,
    /**
     * @description custom summary method
     */
    summaryMethod: Function as PropType<TableProps<DefaultRow>['summaryMethod']>,
    /**
     * @description function that returns custom class names for a row, or a string assigning class names for every row
     */
    rowClassName: [String, Function] as PropType<
      TableProps<DefaultRow>['rowClassName']
    >,
    /**
     * @description function that returns custom style for a row, or an object assigning custom style for every row
     */
    rowStyle: [Object, Function] as PropType<TableProps<DefaultRow>['rowStyle']>,
    /**
     * @description function that returns custom class names for a cell, or a string assigning class names for every cell
     */
    cellClassName: [String, Function] as PropType<
      TableProps<DefaultRow>['cellClassName']
    >,
    /**
     * @description function that returns custom style for a cell, or an object assigning custom style for every cell
     */
    cellStyle: [Object, Function] as PropType<
      TableProps<DefaultRow>['cellStyle']
    >,
    /**
     * @description function that returns custom class names for a row in table header, or a string assigning class names for every row in table header
     */
    headerRowClassName: [String, Function] as PropType<
      TableProps<DefaultRow>['headerRowClassName']
    >,
    /**
     * @description function that returns custom style for a row in table header, or an object assigning custom style for every row in table header
     */
    headerRowStyle: [Object, Function] as PropType<
      TableProps<DefaultRow>['headerRowStyle']
    >,
    /**
     * @description function that returns custom class names for a cell in table header, or a string assigning class names for every cell in table header
     */
    headerCellClassName: [String, Function] as PropType<
      TableProps<DefaultRow>['headerCellClassName']
    >,
    /**
     * @description function that returns custom style for a cell in table header, or an object assigning custom style for every cell in table header
     */
    headerCellStyle: [Object, Function] as PropType<
      TableProps<DefaultRow>['headerCellStyle']
    >,
    /**
     * @description whether current row is highlighted
     */
    highlightCurrentRow: Boolean,
    /**
     * @description key of current row, a set only prop
     */
    currentRowKey: [String, Number],
    /**
     * @description displayed text when data is empty. You can customize this area with `#empty`
     */
    emptyText: String,
    /**
     * @description set expanded rows by this prop, prop's value is the keys of expand rows, you should set row-key before using this prop
     */
    expandRowKeys: Array as PropType<TableProps<DefaultRow>['expandRowKeys']>,
    /**
     * @description whether expand all rows by default, works when the table has a column type="expand" or contains tree structure data
     */
    defaultExpandAll: Boolean,
    /**
     * @description set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order
     */
    defaultSort: Object as PropType<TableProps<DefaultRow>['defaultSort']>,
    /**
     * @description the `effect` of the overflow tooltip
     */
    tooltipEffect: String,
    /**
     * @description the options for the overflow tooltip, [see the following tooltip component](tooltip.html#attributes)
     */
    tooltipOptions: Object as PropType<TableProps<DefaultRow>['tooltipOptions']>,
    /**
     * @description method that returns rowspan and colspan
     */
    spanMethod: Function as PropType<TableProps<DefaultRow>['spanMethod']>,
    /**
     * @description controls the behavior of master checkbox in multi-select tables when only some rows are selected (but not all). If true, all rows will be selected, else deselected
     */
    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },
    /**
     * @description horizontal indentation of tree data
     */
    indent: {
      type: Number,
      default: 16,
    },
    /**
     * @description configuration for rendering nested data
     */
    treeProps: {
      type: Object as PropType<TableProps<DefaultRow>['treeProps']>,
      default: () => {
        return {
          hasChildren: 'hasChildren',
          children: 'children',
          checkStrictly: false,
        }
      },
    },
    /**
     * @description whether to lazy loading data
     */
    lazy: Boolean,
    /**
     * @description method for loading child row data, only works when `lazy` is true
     */
    load: Function as PropType<TableProps<DefaultRow>['load']>,
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    className: {
      type: String,
      default: '',
    },
    /**
     * @description sets the algorithm used to lay out table cells, rows, and columns
     */
    tableLayout: {
      type: String as PropType<Layout>,
      default: 'fixed',
    },
    /**
     * @description always show scrollbar
     */
    scrollbarAlwaysOn: Boolean,
    /**
     * @description ensure main axis minimum-size doesn't follow the content
     */
    flexible: Boolean,
    /**
     * @description whether to hide extra content and show them in a tooltip when hovering on the cell.It will affect all the table columns
     */
    showOverflowTooltip: [Boolean, Object] as PropType<
      TableProps<DefaultRow>['showOverflowTooltip']
    >,
    appendFilterPanelTo: String,
    scrollbarTabindex: {
      type: [Number, String],
      default: undefined,
    },
}
export const createElTableBindProps = bindPropsFactory(tableProps)


export const tableEmits = {
  'select': null,
  'select-all': null,
  'selection-change': null,
  'cell-mouse-enter': null,
  'cell-mouse-leave': null,
  'cell-contextmenu': null,
  'cell-click': null,
  'cell-dblclick': null,
  'row-click': null,
  'row-contextmenu': null,
  'row-dblclick': null,
  'header-click': null,
  'header-contextmenu': null,
  'sort-change': null,
  'filter-change': null,
  'current-change': null,
  'header-dragend': null,
  'expand-change': null,
  'scroll': null,
}

export const createElTableOnEmits = onEmitsFactory(tableEmits)
