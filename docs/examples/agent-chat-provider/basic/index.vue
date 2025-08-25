<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { NormalObject } from '@vunk/shared'
import { MessageViewManager, VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { agentRequest } from './api'
import View from './view.vue'

const request: __VkAgentChatProvider.Request = ({ message }, {
  onSuccess,
  onError,
  onUpdate,
}) => {
  if (!message?.content) {
    return
  }

  // 存储分块数据
  const chunks: __VkAgentChatProvider.RequestOutput[] = []
  // 角色
  const role = 'assistant'

  // 服务端已有响应但无数据
  let seviceLoading = true
  // 服务端发送结束
  let seviceEnd = false

  const viewManager = new MessageViewManager()

  update() // 初始化数据

  agentRequest((e: { data: string }) => { // 请求回调
    let json: NormalObject = {
      content: '',
      reasoning_content: '',
    }

    if (typeof e.data === 'string') {
      try {
        json = JSON.parse(e.data)
      }
      catch (error) {
        onError(error as Error)
      }
    }

    if (json.reasoning_content) {
      seviceLoading = false
      // 思考内容
      viewManager.upsertView({
        content: json.reasoning_content,
        type: 'thinking',
        updating: true, // 多通道下由服务端传输是否结束
      }, {
        onCreate (view) { // 在单通道条件下， 新的视图被创建, 上个视图结束更新
          const prev = viewManager.getPrevView(view)
          prev && (prev.updating = false)
        },
      })
      update()
    }

    if (json.content) {
      seviceLoading = false

      // 回复内容
      viewManager.upsertView({
        content: json.content,
        type: 'text',
        updating: true, // 多通道下由服务端传输是否结束
      }, {
        onCreate (view) { // 在单通道条件下， 新的视图被创建, 上个视图结束更新
          const prev = viewManager.getPrevView(view)
          prev && (prev.updating = false)
        },
      })

      update()
    }

    if (json.is_end) {
      seviceEnd = true
      viewManager.allViewUpdated() // 所有视图结束更新
      update()
      success()
    }
  }, {
    // 客户端发送的消息
    message: message.content,
  })

  function update () { // 更新数据
    const data = {
      role,
      seviceLoading,
      seviceEnd,
      views: viewManager.getViews(),
    }
    onUpdate(data)
    chunks.push(data)
  }

  function success () { // 成功
    onSuccess(chunks)
  }
}

const parser: __VkAgentChatProvider.Parser = (message) => {
  const views = message.views

  let content = message.content ?? ''

  if (views) {
    content = views.reduce((acc, view) => {
      if (view.type === 'thinking') {
        acc += `\n:::thinking\n${view.content}\n:::`
      }
      else {
        acc += `\n${view.content}`
      }
      return acc
    }, '')
  }

  return {
    role: message.role ?? 'assistant',
    loading: message.seviceLoading === true,
    content,
  }
}
</script>

<template>
  <VkAgentChatProvider
    :request="request"
    :parser="parser"
  >
    <View></View>
  </VkAgentChatProvider>
</template>
