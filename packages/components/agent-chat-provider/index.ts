import type { App } from 'vue'
import VkAgentChatProvider from './src/index.vue'

export * from './src/types'
export * as __VkAgentChatProvider from './src/types'
export { useAgentChat } from './src/use'

VkAgentChatProvider.install = (app: App): void => {
  app.component(VkAgentChatProvider.name || 'VkAgentChatProvider', VkAgentChatProvider)
}
export {
  VkAgentChatProvider,
}
export default VkAgentChatProvider
