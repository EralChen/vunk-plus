import type { SSEOutput } from 'ant-design-x-vue'
import type { AgentChatContext, AgentMessage, BubbleItem, BubbleMessage, Parser, Request, RequestParams } from './types'
import { useXAgent, useXChat } from 'ant-design-x-vue'
import { computed, inject, provide } from 'vue'

import { ChatAgentInjectKey } from './const'
import { Role, roleMap } from './const-roles'

export function useAgent (request: Request): ReturnType<typeof useXAgent<
  AgentMessage,
  RequestParams<AgentMessage>,
  AgentMessage & SSEOutput
>> {
  return useXAgent<AgentMessage>({
    request,
  })
}

export function initAgentChat (
  request: Request,
  parser: Parser,
): AgentChatContext {
  const [agent] = useAgent(request)
  const chat = useXChat<AgentMessage, BubbleMessage>({
    agent: agent.value,
    // Convert AgentMessage to BubbleMessage
    parser,

  })

  const onRequest = (message: string) => {
    chat.onRequest({
      role: Role.User,
      content: message,
    })
  }
  const items = computed(() => {
    return chat.parsedMessages.value.map((item) => {
      return {
        key: item.id,
        ...roleMap[item.message.role],
        ...item.message,
      } as BubbleItem
    })
  })

  const simplicity = {
    onRequest,
    items,
  }
  const ctx = {
    agent,
    chat,
    simplicity,
  } as unknown as AgentChatContext
  provide(ChatAgentInjectKey, ctx)
  return ctx
}

export function useAgentChat () {
  const ctx = inject(ChatAgentInjectKey, null)
  if (!ctx) {
    throw new Error('useAgentChat must be used within a provider')
  }
  return ctx as AgentChatContext
}
