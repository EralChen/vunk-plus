import type { App } from 'vue'
import VkTablesV1 from './src/index.vue'

export * as _VkTabelsV1Ctx from './src/ctx'
export * as __VkTablesV1 from './src/types'

VkTablesV1.install = (app: App): void => {
  app.component(VkTablesV1.name || 'VkTablesV1', VkTablesV1)
}
export {
  VkTablesV1,
}
export default VkTablesV1
