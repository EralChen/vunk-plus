import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { NormalObject } from '@vunk/shared'
import type { RestFetchReaderOnmessage } from '@vunk/shared/fetch'
import { cChatId } from '@/api/application'
import { useApplicationProfile } from '@/components/authentication'
import { Role } from '@vunk-plus/components/agent-chat-provider'
import { restFetch } from '@vunk/shared/fetch'
import { ref } from 'vue'

async function agentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: {
    message: string
    chatId: string
  },
  abortController?: AbortController,
) {
  return restFetch.reader({
    url: `/application/chat_message/${data.chatId}`,
    onmessage,
    abortController,
  }, {
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
    data: {
      message: data.message,
    },
  })
}

export function useRequest () {
  const { id: applicationId } = useApplicationProfile()
  const chatId = ref<string>('')
  const ready = ref(false)

  cChatId({
    application_id: applicationId,
  }).then((id) => {
    chatId.value = id
    ready.value = true
  })

  const request: __VkAgentChatProvider.Request = (info, event) => {
    const { message } = info
    const { onSuccess, onUpdate } = event

    if (!message?.content) {
      return
    }

    const abortController = new AbortController()

    let content = ''
    const role = Role.Assistant
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
        abortController,
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
        abortController,
      })
    }

    update()

    agentRequest(
      (e: any) => {
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
      },
      { message: message?.content, chatId: chatId.value },
      abortController,
    ).catch(() => {
      success()
    })
  }
  return {
    request,
    ready,
  }
}
