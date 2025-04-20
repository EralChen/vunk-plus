import type { RequestFn } from 'ant-design-x-vue'

import type { AgentMessage, BubbleItem, BubbleMessage } from './types'
import { useXAgent, useXChat } from 'ant-design-x-vue'
import { consola } from 'consola'
import { computed, inject, provide } from 'vue'

import { ChatAgentInjectKey } from './const'
import { Role, roleMap } from './const-roles'

export function useAgent (request: RequestFn<AgentMessage>) {
  return useXAgent<AgentMessage>({
    request,
  })
}

export function initAgentChat (request: RequestFn<AgentMessage>) {
  const [agent] = useAgent(request)
  const chat = useXChat<AgentMessage, BubbleMessage>({
    agent: agent.value,

    // Convert AgentMessage to BubbleMessage
    parser (message) {
      const list = [
        {
          ...message,
          loading: message.seviceLoading,
        },
      ]
      if (message.thinkingContent) {
        list.unshift({
          role: Role.Broadcasting,
          content: '我在思考中，请稍等...',
          seviceLoading: false,
          seviceEnd: true,
          loading: false,
          meta: {
            metahumanStatus: 2,
          },
        })
      }
      return list
    },
  })

  const onRequest = (message: string) => {
    chat.onRequest({
      role: Role.User,
      content: message,
    })
  }
  const items = computed(() => {
    return chat.parsedMessages.value.map((item, index) => {
      if (index === chat.parsedMessages.value.length - 1) {
        consola.info('parsedMessages', item.message)
      }

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
  }
  provide(ChatAgentInjectKey, ctx)
  return ctx
}

export function useAgentChat () {
  const ctx = inject(ChatAgentInjectKey, null)
  if (!ctx) {
    throw new Error('useAgentChat must be used within a provider')
  }
  return ctx as ReturnType<typeof initAgentChat>
}
