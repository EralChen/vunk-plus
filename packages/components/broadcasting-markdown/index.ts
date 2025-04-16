import type { App } from 'vue'
import VkBroadcastingMarkdown from './src/index.vue'

export * as __VkBroadcastingMarkdown from './src/types'

VkBroadcastingMarkdown.install = (app: App): void => {
  app.component(VkBroadcastingMarkdown.name || 'VkBroadcastingMarkdown', VkBroadcastingMarkdown)
}
export {
  VkBroadcastingMarkdown,
}
export default VkBroadcastingMarkdown
