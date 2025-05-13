---
title: AgentChatProvider
lang: zh-CN
---

# AgentChatProvider

AgentChatProvider 是一个对话代理提供者组件，用于处理聊天消息的请求、响应和状态管理。它支持流式响应处理、思考状态显示和多种角色支持。

你可以查阅以下链接了解抽象数据流的工作细节:

[useXAgent](https://x.ant.design/components/use-x-agent-cn)

[useXChat](https://x.ant.design/components/use-x-chat-cn)

## 基本用法

使用 AgentChatProvider 包裹聊天相关组件，为其提供上下文能力：

```vue
<template>
  <VkAgentChatProvider
    :request="request"
    :parser="parser"
    @load="agentChatContext.resolve"
  >
    <VkChatIndependent
      :data="bubbleData"
      :speech-to-text="speechToTextFn"
      :text-to-speech="textToSpeechFn"
      @set-data="setData(bubbleData, $event)"
    />
  </VkAgentChatProvider>
</template>
```

## Props

| prop | type | default | description |
| --- | --- | --- | --- |
| request | `Function` | 内置默认函数 | 请求处理函数，用于处理聊天消息的发送和接收 |
| parser | `Function` | 内置默认函数 | 消息解析函数，用于解析和转换接收到的消息 |

## Events

| name | arguments | description |
| --- | --- | --- |
| load | `(context: AgentChatContext)` | 组件加载完成时触发，返回代理聊天上下文 |

## 内置角色类型

组件支持三种角色类型：

```ts
export enum Role {
  User = 'user', // 用户角色
  Assistant = 'assistant', // 助手角色
  Broadcasting = 'broadcasting', // 播报角色
}
```

## 提供的能力

组件通过 Vue 的 provide/inject 机制提供以下上下文：

### 使用方式

```ts
import { useAgentChat } from '@vunk-plus/components/agent-chat-provider'

// 在子组件中获取上下文
const { agent, chat, simplicity } = useAgentChat()
```

### 上下文内容

- `agent`: 代理实例，提供消息管理相关功能
- `chat`: 聊天实例，提供消息解析和处理功能
- `simplicity`: 简化的接口
  - `onRequest(message: string)`: 发送消息
  - `items`: 聊天消息列表（计算属性）

## 自定义请求处理

可以通过自定义 `request` 属性来实现自定义请求处理逻辑：

### 基本示例

```ts
const request: __VkAgentChatProvider.Request = (info, event) => {
  const { message } = info
  const { onSuccess, onUpdate } = event

  // 处理消息发送
  // 使用 onUpdate 更新消息状态
  // 使用 onSuccess 标记消息发送成功
}
```

:::details 完整实现示例

```ts
// 自定义请求函数
async function agentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: {
    message: string
    chatId: string
  }
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

// 组合成请求处理器
export function useRequest () {
  const { id: applicationId } = useApplicationProfile()
  const chatId = ref<string>('')
  const ready = ref(false)

  // 获取会话ID
  cChatId({
    application_id: applicationId,
  }).then((id) => {
    chatId.value = id
    ready.value = true
  })

  // 实现请求处理函数
  const request: __VkAgentChatProvider.Request = (info, event) => {
    const { message } = info
    const { onSuccess, onUpdate } = event

    if (!message?.content) {
      return
    }

    // 初始化状态
    let content = ''
    const role = Role.Broadcasting
    let thinkingContent = ''
    let thinkingStatus: __VkAgentChatProvider.AgentMessage['thinkingStatus'] = 'start'
    let seviceLoading = true

    // 更新状态的函数
    const update = () => {
      onUpdate({
        role,
        content,
        thinkingContent,
        thinkingStatus,
        seviceLoading,
      })
    }

    // 成功完成的函数
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

    // 初始状态更新
    update()

    // 发送请求并处理流式响应
    agentRequest((e: any) => {
      let json = {
        content: '',
        reasoning_content: '',
      }

      if (typeof e.data === 'string') {
        json = JSON.parse(e.data)
      }

      // 处理结束信号
      if (json.is_end) {
        success()
        return
      }

      // 处理思考内容
      if (json.reasoning_content) {
        thinkingContent += json.reasoning_content
        thinkingStatus = 'thinking'
        seviceLoading = false
        update()
      }

      // 处理回复内容
      if (json.content) {
        content += json.content
        seviceLoading = false
        update()
      }

      // 思考完成的判断
      if (thinkingContent && json.content) {
        thinkingStatus = 'end'
        update()
      }
    }, {
      message: message?.content,
      chatId: chatId.value
    })
  }

  return {
    request,
    ready,
  }
}
```

:::

## 自定义消息解析

可以通过自定义 `parser` 属性来实现自定义消息解析逻辑：

### 基本示例

```ts
const parser: __VkAgentChatProvider.Parser = (message) => {
  // 解析消息并返回气泡消息列表
  return [
    {
      ...message,
      // 可以添加额外属性
    }
  ]
}
```

:::details 完整实现示例

```ts
import { type __VkAgentChatProvider, Role } from '@vunk-plus/components/agent-chat-provider'

export const parser: __VkAgentChatProvider.Parser = (message) => {
  // 主消息
  const list = [
    {
      ...message,
      loading: message.seviceLoading,
    },
  ]

  // 当存在思考内容时，添加一个额外的提示消息
  if (message.thinkingContent) {
    list.unshift({
      role: Role.Broadcasting,
      content: '您好，请让我先思考一下这个问题，再给您回答',
      seviceLoading: false,
      seviceEnd: true,
      loading: false,
      meta: {
        metahumanStatus: 2, // 设置背景状态
      },
    })
  }

  return list
}
```

:::
这个示例展示了如何：
1. 处理消息的加载状态
2. 在有思考内容时添加额外的提示消息
3. 设置元数据和状态

## 思考状态处理

组件支持显示思考状态，通过 `thinkingContent` 和 `thinkingStatus` 控制：

- `thinkingStatus`: 思考状态
  - `start`: 开始思考
  - `thinking`: 思考中
  - `end`: 思考结束
  - `error`: 思考错误
- `thinkingContent`: 思考内容

## 类型定义

```ts
// 请求函数类型
export type Request = RequestFn<AgentMessage>

// 解析器类型
export type Parser = (message: AgentMessage) => BubbleMessage | BubbleMessage[]

// 代理消息类型
export type AgentMessage = BubbleMessage & {
  seviceLoading?: boolean
  seviceEnd?: boolean
}

// 气泡消息类型
export type BubbleMessage = Partial<BubbleListItemProps> & {
  role: string
  content: string
  seviceEnd?: boolean
  thinkingStatus?: 'start' | 'thinking' | 'end' | 'error'
  thinkingContent?: string
  meta?: NormalObject
}
```

## 完整用例

下面展示一个完整的聊天应用实现，包含代理聊天提供者、独立聊天组件、语音转文本、文本转语音等功能：

```vue
<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { speechToText, textToSpeech } from '@/api/application'
import { useApplicationProfile } from '@/components/authentication'
import { MetahumanBackground, MetahumanStatus } from '@/components/metahuman-background'
import { Role, VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkChatIndependent } from '@vunk-plus/components/chat-independent'
import { setData } from '@vunk/core'
import { useDeferred } from '@vunk/core/composables'
import { computed, ref, watchEffect } from 'vue'
import { parser } from './parser'
import { useRequest } from './useRequest'

// 获取应用配置
const {
  stt_model_enable, // 语音转文本是否启用
  id: applicationId,
  prologue, // 开场白
} = useApplicationProfile()

// 获取请求处理函数
const { ready, request } = useRequest()

/* chat 数据 */
const bubbleData = ref<__VkBubbleList.RenderData>({})
const agentChatContext = useDeferred<__VkAgentChatProvider.AgentChatContext>()
const bubbleItems = computed(() => {
  return agentChatContext.value?.simplicity.items.value ?? []
})

// 获取指定索引的气泡数据
function getBubbleDataAt (index: number) {
  const bubble = bubbleItems.value.at(index)
  if (bubble?.key && bubbleData.value[bubble.key]) {
    return bubbleData.value[bubble.key]
  }
  return {}
}

// 获取最后一个气泡数据
const lastBubbleData = computed(() => {
  return getBubbleDataAt(-1)
})

// 查找当前正在播报的气泡
const currentBroadcasting = computed(() => {
  return Object.values(bubbleData.value).find((bubble) => {
    return bubble.meta?.broadcasting === true
  })
})

// 根据播报状态获取背景状态
const currentMetahumanStatus = computed(() => {
  if (!currentBroadcasting.value) {
    return MetahumanStatus.SILENT
  }
  return currentBroadcasting.value?.meta?.metahumanStatus ?? MetahumanStatus.SPEAKING
})

/* 添加开场白 */
agentChatContext.promise.then(({ chat }) => {
  chat.setMessages([{
    id: 'prologue',
    message: {
      role: Role.Broadcasting,
      content: prologue.split('\n')[0] || prologue,
      seviceEnd: true,
      meta: {
        metahumanStatus: MetahumanStatus.WELCOME,
      },
    },
    status: 'success',
  }])
})

/* 语音输入输出功能 */
// 文本转语音函数
function textToSpeechFn (text: string) {
  return textToSpeech({
    application_id: applicationId,
    text,
  }).then((blob) => {
    const url = URL.createObjectURL(blob)
    return url
  })
}

// 语音转文本函数
function speechToTextFn (blob) {
  const file = new File([blob], 'audio.wav', {
    type: 'audio/wav',
  })
  return speechToText({
    application_id: applicationId,
    file,
  }).then(res => res.data)
}
</script>

<template>
  <div h-full w-full pos-relative>
    <!-- 聊天代理提供者 -->
    <VkAgentChatProvider
      v-if="ready"
      :request="request"
      :parser="parser"
      @load="agentChatContext.resolve"
    >
      <!-- 独立聊天组件 -->
      <VkChatIndependent
        class="home-chat-independent"
        :data="bubbleData"
        :speech-to-text="stt_model_enable
          ? speechToTextFn
          : undefined"
        :text-to-speech="textToSpeechFn"
        @set-data="setData(bubbleData, $event)"
      >
        <!-- 自定义背景 -->
        <template #background>
          <MetahumanBackground
            :status="currentMetahumanStatus"
          ></MetahumanBackground>
        </template>
      </VkChatIndependent>
    </VkAgentChatProvider>
  </div>
</template>

<style>
.home-chat-independent {
  overflow: hidden;
}
.home-chat-independent .vk-chat-independent-main__duplex {
  padding-top: 40vh;
}
.home-chat-independent .el-bubble-list > .el-bubble:last-child {
  margin-bottom: 40px;
}
.home-chat-independent .vk-chat-independent-main__bubbles {
  mask-image: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
```

### 关键功能解析

1. **初始化**
   - 通过 `useRequest()` 获取请求处理函数
   - 使用 `useDeferred` 解决组件加载顺序问题

2. **数据处理**
   - 通过计算属性监听气泡数据和状态变化
   - 设置聊天开场白

3. **多模态交互**
   - 实现文本转语音和语音转文本功能
   - 根据播报状态控制背景表现

4. **组件结构**
   - 使用 VkAgentChatProvider 提供聊天代理能力
   - 嵌套 VkChatIndependent 处理聊天界面和交互
   - 通过插槽自定义背景组件
