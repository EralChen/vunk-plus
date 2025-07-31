import type { App } from 'vue'
import VkChatIndependent from './src/index.vue'

export * as __VkChatIndependent from './src/types'

VkChatIndependent.install = (app: App): void => {
  app.component(VkChatIndependent.name || 'VkChatIndependent', VkChatIndependent)
}
export {
  VkChatIndependent,
}
export default VkChatIndependent
