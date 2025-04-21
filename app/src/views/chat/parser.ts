import { type __VkAgentChatProvider, Role } from '@vunk-plus/components/agent-chat-provider'

export const parser: __VkAgentChatProvider.Parser = (message) => {
  const list = [
    {
      ...message,
      loading: message.seviceLoading,
    },
  ]
  if (message.thinkingContent) {
    list.unshift({
      role: Role.Broadcasting,
      content: '您好，请让我先思考一下这个问题，再给您回答',
      seviceLoading: false,
      seviceEnd: true,
      loading: false,
      meta: {
        metahumanStatus: 2,
      },
    })
  }
  return list
}
