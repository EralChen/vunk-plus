import type { NormalObject } from '@vunk/shared'
import type { AgentMessage, BubbleMessage } from './types'
import { type __VkBubbleList, Role, roleMap } from '@vunk-plus/components/bubble-list'
import { useXAgent, useXChat } from 'ant-design-x-vue'
import { consola } from 'consola'
import { computed, inject, provide } from 'vue'
import { agentRequest } from './api'
import { ChatAgentInjectKey } from './const'

export function useAgent () {
  return useXAgent<AgentMessage>({
    request: (info, event) => {
      const { message } = info

      // 向 useXChat 发送 AgentMessage 数据
      const { onSuccess, onUpdate } = event

      if (!message?.content) {
        return
      }

      let text = ''

      onUpdate({
        role: Role.Broadcasting,
        content: text,
        seviceLoading: true,
      })

      agentRequest((e) => {
        let json: NormalObject = { content: '' }
        if (typeof e.data === 'string') {
          json = JSON.parse(e.data)
        }

        if (json.content) {
          text += json.content
          onUpdate({
            role: Role.Broadcasting,
            content: text,
            seviceLoading: false,
          })
        }

        if (json.is_end) {
          onSuccess({
            role: Role.Broadcasting,
            content: text,
            seviceEnd: true,
          })
        }
      }, { message: message?.content })
    },
  })
}

export function initAgentChat () {
  const [agent] = useAgent()
  const chat = useXChat<AgentMessage, BubbleMessage>({
    agent: agent.value,

    // Convert AgentMessage to BubbleMessage
    parser (message) {
      return {
        ...message,
        loading: message.seviceLoading,
      }
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
      } as __VkBubbleList.Item
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
