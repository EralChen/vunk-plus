import type { NormalObject } from '@vunk/shared'
import type { AgentMessage, BubbleMessage } from './types'
import { type __VkBubbleList, Role, roleMap } from '@vunk-plus/components/bubble-list'
import { useXAgent, useXChat } from 'ant-design-x-vue'
import { computed } from 'vue'
import { agentRequest } from './api'

// http://localhost:3000/api/application/chat_message/b0ecc6e4-1a7f-11f0-80b2-005056c00008

export function useAgent () {
  return useXAgent<AgentMessage>({
    request: (info, event) => {
      const { message } = info
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
          })
        }
      }, { message: message?.content })
    },
  })
}

export function useAgentChat () {
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
    return chat.parsedMessages.value.map((item) => {
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

  return {
    agent,
    chat,
    simplicity,
  }
}
