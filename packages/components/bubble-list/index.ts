import type { App } from 'vue'
import VkBubbleList from './src/index.vue'

export * as __VkBubbleList from './src/types'
export { Role } from '@vunk-plus/components/agent-chat-provider'

VkBubbleList.install = (app: App): void => {
  app.component(VkBubbleList.name || 'VkBubbleList', VkBubbleList)
}
export {
  VkBubbleList,
}
export default VkBubbleList
