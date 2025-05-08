import type { App } from 'vue'
import VkPixiFrame from './src/index.vue'

export * as __VkPixiFrame from './src/types'
export { TickerStatus } from '@vunk/shared/enum'

VkPixiFrame.install = (app: App): void => {
  app.component(VkPixiFrame.name || 'VkPixiFrame', VkPixiFrame)
}
export {
  VkPixiFrame,
}
export default VkPixiFrame
