import type { App } from 'vue'
import VkDrawer from './src/index.vue'

VkDrawer.install = (app: App): void => {
  app.component(VkDrawer.name || 'VkDrawer', VkDrawer)
}
export {
  VkDrawer,
}
export default VkDrawer
