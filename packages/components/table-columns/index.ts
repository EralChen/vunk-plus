import type { App } from 'vue'
import VkTableColumns from './src/index.vue'

export * as _VkTableColumnsElCtx from './src/el-ctx'
export * as __VkTableColumns from './src/types'

VkTableColumns.install = (app: App): void => {
  app.component(VkTableColumns.name!, VkTableColumns)
}
export {
  VkTableColumns,
}
export default VkTableColumns
