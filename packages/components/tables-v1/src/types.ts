import type { __VkTableColumns } from '@vunk-plus/components/table-columns'
import type { NormalObject } from '@vunk/core'

export type Column<T extends NormalObject = any> =
 __VkTableColumns.Source<T>

export {}
