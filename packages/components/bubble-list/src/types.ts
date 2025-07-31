import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'

export type Item<S = never> = __VkAgentChatProvider.BubbleItemBasic & (
  __VkBubbleTemplates.RenderItem
  | S
)

export type RenderData = __VkBubbleTemplates.RenderData
