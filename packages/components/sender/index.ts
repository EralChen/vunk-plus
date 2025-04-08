import type { App } from 'vue'
import VkSender from './src/index.vue'

export * as __VkSender from './src/types'

VkSender.install = (app: App): void => {
  app.component(VkSender.name || 'VkSender', VkSender)
}
export {
  VkSender,
}
export default VkSender
