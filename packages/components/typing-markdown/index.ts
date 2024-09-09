import { App } from 'vue'
import VkTypingMarkdown from './src/index.vue'
export * as __VkTypingMarkdown from './src/types'

VkTypingMarkdown.install = (app: App): void => {
  app.component(VkTypingMarkdown.name || 'VkTypingMarkdown', VkTypingMarkdown)
}
export {
  VkTypingMarkdown,
}
export default VkTypingMarkdown
