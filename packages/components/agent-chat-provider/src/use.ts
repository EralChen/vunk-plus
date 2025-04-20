import type { NormalObject } from '@vunk/shared'
import type { AgentMessage, BubbleItem, BubbleMessage } from './types'

import { useXAgent, useXChat } from 'ant-design-x-vue'
import { consola } from 'consola'
import { computed, inject, provide } from 'vue'
import { agentRequest } from './api'
import { ChatAgentInjectKey } from './const'
import { Role, roleMap } from './const-roles'

export function useAgent () {
  return useXAgent<AgentMessage>({
    request: (info, event) => {
      const { message } = info

      // 向 useXChat 发送 AgentMessage 数据
      const { onSuccess, onUpdate } = event

      if (!message?.content) {
        return
      }

      let content = ''
      const role = Role.Broadcasting
      let thinkingContent = ''
      let thinkingStatus: AgentMessage['thinkingStatus'] = 'start'
      let seviceLoading = true
      const update = () => {
        onUpdate({
          role,
          content,
          thinkingContent,
          thinkingStatus,
          seviceLoading,
        })
      }
      const success = () => {
        onSuccess({
          role,
          content,
          thinkingContent,
          thinkingStatus,
          seviceLoading,
          seviceEnd: true,
        })
      }

      update()

      agentRequest((e) => {
        let json: NormalObject = {
          content: '',
          reasoning_content: '',
        }
        if (typeof e.data === 'string') {
          json = JSON.parse(e.data)
        }
        if (json.is_end) {
          success()
          return
        }

        if (json.reasoning_content) {
          thinkingContent += json.reasoning_content
          thinkingStatus = 'thinking'
          seviceLoading = false
          update()
        }

        if (json.content) {
          content += json.content
          seviceLoading = false
          update()
        }
        if (
          thinkingContent && json.content
        ) { // 思考完成
          thinkingStatus = 'end'
          update()
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
        thinkingContent: item.message.thinkingContent,

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
