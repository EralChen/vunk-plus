import type { SSEOutput } from 'ant-design-x-vue'
import type { AgentChatContext, AgentMessage, BubbleItem, BubbleMessage, formatSend, Parser, Request, RequestParams } from './types'
import { useXAgent, useXChat } from 'ant-design-x-vue'
import { computed, inject, provide } from 'vue'

import { ChatAgentInjectKey } from './const'
import { roleMap } from './const-roles'

export function useAgent (request: Request): ReturnType<typeof useXAgent<
  AgentMessage,
  RequestParams<AgentMessage>,
  AgentMessage & SSEOutput
>> {
  // @ts-expect-error ant-design-x-vue generic type mismatch
  return useXAgent<AgentMessage>({
    // @ts-expect-error ant-design-x-vue generic type mismatch
    request,
  })
}

export function initAgentChat (
  request: Request,
  parser: Parser,
  formatSend: formatSend,
): AgentChatContext {
  const [agent] = useAgent(request)
  const chat = useXChat<AgentMessage, BubbleMessage>({
    // @ts-expect-error ant-design-x-vue generic type mismatch
    agent: agent.value,
    // Convert AgentMessage to BubbleMessage
    parser,

  })

  const onRequest = (message: string) => {
    const userMessage = formatSend(message)
    chat.onRequest(userMessage)
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
