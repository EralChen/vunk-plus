import { App } from 'vue'
import VkVditor from './src/index.vue'
export * as __VkVditor from './src/types'

VkVditor.install = (app: App): void => {
  app.component(VkVditor.name || 'VkVditor', VkVditor)
}
export {
  VkVditor,
}
export default VkVditor
