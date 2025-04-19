import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import type { Media } from '@vunk/shared'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types'
import type { Role } from './const-roles'
import type { initAgentChat } from './use'

export type AgentChatContext = ReturnType<typeof initAgentChat>

/**
 * @description useXChat parser 解析数据
 */
export type BubbleMessage = Partial<BubbleListItemProps> & {
  role: Role
  content: string
  seviceEnd?: boolean
}

/**
 * @description   useXAgent request onSuccess 发送的数据
 */
export type AgentMessage = BubbleMessage & {
  seviceLoading?: boolean
  seviceEnd?: boolean
}

export type BubbleItem = BubbleItemBasic
  & __VkBubbleTemplates.RenderItem

export type RoleMedia = RoleMediaBasic
  & __VkBubbleTemplates.RenderItem

interface BubbleItemBasic extends BubbleMessage {
  key: string
}
interface RoleMediaBasic extends Partial<BubbleItemBasic>
  , Media {
  value: Role
}
