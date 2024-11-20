import { App } from 'vue'
import VkTableColumns from './src/index.vue'
export * as __VkTableColumns from './src/types'
export * as _VkTableColumnsElCtx from './src/el-ctx'

VkTableColumns.install = (app: App): void => {
  app.component(VkTableColumns.name, VkTableColumns)
}
export {
  VkTableColumns,
}
export default VkTableColumns
