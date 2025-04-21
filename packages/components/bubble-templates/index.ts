import type { App } from 'vue'
import VkBubbleTemplates from './src/index.vue'

export * as __VkBubbleTemplates from './src/types'

VkBubbleTemplates.install = (app: App): void => {
  app.component(VkBubbleTemplates.name || 'VkBubbleTemplates', VkBubbleTemplates)
}
export {
  VkBubbleTemplates,
}
export default VkBubbleTemplates
