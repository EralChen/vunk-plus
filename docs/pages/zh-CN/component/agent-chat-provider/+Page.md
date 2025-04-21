---
title: AgentChatProvider
lang: zh-CN
---

# AgentChatProvider

AgentChatProvider 是一个对话代理提供者组件，用于处理聊天消息的请求、响应和状态管理。它支持流式响应处理、思考状态显示和多种角色支持。

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

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| request | `Function` | 内置默认函数 | 请求处理函数，用于处理聊天消息的发送和接收 |
| parser | `Function` | 内置默认函数 | 消息解析函数，用于解析和转换接收到的消息 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| load | `(context: AgentChatContext)` | 组件加载完成时触发，返回代理聊天上下文 |

## 角色类型

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

```ts
const request: __VkAgentChatProvider.Request = (info, event) => {
  const { message } = info
  const { onSuccess, onUpdate } = event

  // 处理消息发送
  // 使用 onUpdate 更新消息状态
  // 使用 onSuccess 标记消息发送成功
}
```

## 自定义消息解析

可以通过自定义 `parser` 属性来实现自定义消息解析逻辑：

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
  role: Role
  content: string
  seviceEnd?: boolean
  thinkingStatus?: 'start' | 'thinking' | 'end' | 'error'
  thinkingContent?: string
  meta?: NormalObject
}
```

## 配合 ChatIndependent 使用

结合 `ChatIndependent` 组件使用可以快速创建一个完整的聊天应用：

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
    >
      <!-- 可自定义背景 -->
      <template #background>
        <MetahumanBackground
          :status="currentMetahumanStatus"
        ></MetahumanBackground>
      </template>
    </VkChatIndependent>
  </VkAgentChatProvider>
</template>
