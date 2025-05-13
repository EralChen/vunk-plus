import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import type { Media, NormalObject } from '@vunk/shared'
import type { RequestFn } from 'ant-design-x-vue'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types'
import type { initAgentChat } from './use'

export type AgentChatContext = ReturnType<typeof initAgentChat>

export type Request = RequestFn<AgentMessage>

export type Parser = (message: AgentMessage) => BubbleMessage | BubbleMessage[]

/**
 * @description   useXAgent request onSuccess 发送的数据
 */
export type AgentMessage = BubbleMessage & {
  seviceLoading?: boolean
  seviceEnd?: boolean
}

/**
 * @description useXChat parser 解析数据
 */
export type BubbleMessage = Partial<BubbleListItemProps> & {
  role: string
  content: string

  /**
   * @description 服务端请求是否完成
   */
  seviceEnd?: boolean

  thinkingStatus?: 'start' | 'thinking' | 'end' | 'error'
  thinkingContent?: string

  meta?: NormalObject

  abortController?: AbortController

  templateType?: string

  [key: string]: any
}

export type BubbleItem = BubbleItemBasic
  & __VkBubbleTemplates.RenderItem

export type RoleMedia = RoleMediaBasic
  & __VkBubbleTemplates.RenderItem

export type BubbleItemModule = 'Thinking'

export interface BubbleItemBasic extends BubbleMessage {
  key?: string
  modules?: BubbleItemModule[]
}
export interface RoleMediaBasic extends Partial<BubbleItemBasic>
  , Media {
  value: string
}
