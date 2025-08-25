import type { App } from 'vue'
import { useBubbleData, VkBubbleData, VkBubbleRenderer, VkBubbleRenderTemplate, VkBubbleRenderTemplates } from './src/core'
import VkBubbleTemplates from './src/index.vue'

export * as __VkBubbleTemplates from './src/types'

VkBubbleTemplates.install = (app: App): void => {
  app.component(VkBubbleTemplates.name || 'VkBubbleTemplates', VkBubbleTemplates)
}
export {
  useBubbleData,
  VkBubbleData,
  VkBubbleRenderer,
  VkBubbleRenderTemplate,
  VkBubbleRenderTemplates,

  VkBubbleTemplates,
}
export default VkBubbleTemplates
