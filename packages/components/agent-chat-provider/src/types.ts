import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import type { MaybeArray, Media, NormalObject } from '@vunk/shared'
import type { RequestFn, SSEOutput, useXChat, XAgent, XRequestParams } from 'ant-design-x-vue'
import type { ComputedRef } from 'vue'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types'
import type { MessageView } from './MessageView'

export type RequestParams<Message> = Omit<XRequestParams, 'message'> & {
  message: Message
  messages?: Message[]
} & NormalObject

export interface AgentChatContext {
  agent: ComputedRef<XAgent<AgentMessage>>

  chat: ReturnType<typeof useXChat<AgentMessage, BubbleMessage>>

  simplicity: {
    onRequest: (message: string) => void
    items: ComputedRef<BubbleItem[]>
  }
}

export type Request = RequestFn<
  AgentMessage,
  RequestParams<AgentMessage>,
  RequestOutput
>

export type Parser = (message: Partial<AgentMessage>) => MaybeArray<BubbleMessage>

export type RequestOutput = AgentMessage & SSEOutput

/**
 * @description   useXAgent request onSuccess 发送的数据
 */
export type AgentMessage = Partial<BubbleMessage> & {
  seviceLoading?: boolean
  seviceEnd?: boolean
  views?: MessageView[]
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
  key: string
  modules?: BubbleItemModule[]
}
export interface RoleMediaBasic extends Partial<BubbleItemBasic>
  , Media {
  value: string
}
