import type { App } from 'vue'
import VkPixiFrameCore from './src/core.vue'
import VkPixiFrame from './src/index.vue'
import VkPixiFrameProvider from './src/provider.vue'
import VkPixiFrameView from './src/view.vue'

export * as __VkPixiFrame from './src/types'
export { TickerStatus } from '@vunk/shared/enum'

VkPixiFrame.install = (app: App): void => {
  app.component(VkPixiFrame.name || 'VkPixiFrame', VkPixiFrame)
}
export {
  VkPixiFrame,
  VkPixiFrameCore,
  VkPixiFrameProvider,
  VkPixiFrameView,
}
export default VkPixiFrame
