import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { NormalObject } from '@vunk/shared'
import type { RestFetchReaderOnmessage } from '@vunk/shared/fetch'
import { Role } from '@vunk-plus/components/agent-chat-provider'
import { restFetch } from '@vunk/shared/fetch'

async function agentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: {
    message: string
    chatId: string
  },
) {
  return restFetch.reader({
    url: `/application/chat_message/${data.chatId}`,
    onmessage,
  }, {
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
    data: {
      message: data.message,
    },
  })
}

export function createRequest (e: {
  chatId: string
}) {
  const request: __VkAgentChatProvider.Request = (info, event) => {
    const { message } = info
    const { onSuccess, onUpdate } = event

    if (!message?.content) {
      return
    }

    let content = ''
    const role = Role.Broadcasting
    let thinkingContent = ''
    let thinkingStatus: __VkAgentChatProvider.AgentMessage['thinkingStatus'] = 'start'
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

    agentRequest((e: any) => {
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
    }, { message: message?.content, chatId: e.chatId })
  }
  return request
}
