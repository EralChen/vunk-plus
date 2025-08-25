import { createStrategyRenderer } from '@vunk/core/components/strategy-renderer'

const key = 'vk-bubble-template-renderer'

export const {
  Templates: VkBubbleRenderTemplates,
  Template: VkBubbleRenderTemplate,
  Data: VkBubbleData,
  Renderer: VkBubbleRenderer,
  useData: useBubbleData,
} = createStrategyRenderer(key)
