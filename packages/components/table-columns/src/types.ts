import { Func, Keyof, NormalObject, VueComponentPropsType } from '@vunk/core'
import { ElTableColumn } from 'element-plus'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export type DefaultSlot<R extends NormalObject> = Func<{
  row: R,
  column: TableColumnCtx<R>,
  $index: number
}>

export interface Source<T extends NormalObject = NormalObject>
  extends VueComponentPropsType<typeof ElTableColumn> {
  prop?: Keyof<T>,
  slots?: DefaultSlot<T> | {
    default?: DefaultSlot<T>,
    header?: Func<{ column: TableColumnCtx<T>, $index: number }>
  }
  children?: Source<T>[]
  hidden?: boolean
}

export { }
