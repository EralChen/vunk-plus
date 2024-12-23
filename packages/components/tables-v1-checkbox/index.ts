import type { App } from 'vue'
import VkTablesV1Checkbox from './src/index.vue'

export * as _VkTablesV1CheckboxCtx from './src/ctx'
export * as __VkTablesV1Checkbox from './src/types'

VkTablesV1Checkbox.install = (app: App): void => {
  app.component(VkTablesV1Checkbox.name || 'VkTablesV1Checkbox', VkTablesV1Checkbox)
}
export {
  VkTablesV1Checkbox,
}
export default VkTablesV1Checkbox
