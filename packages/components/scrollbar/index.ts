import type { App } from 'vue'
import VkScrollbar from './src/index.vue'

export * as __VkScrollbar from './src/types'

VkScrollbar.install = (app: App): void => {
  app.component(VkScrollbar.name || 'VkScrollbar', VkScrollbar)
}
export {
  VkScrollbar,
}
export default VkScrollbar
