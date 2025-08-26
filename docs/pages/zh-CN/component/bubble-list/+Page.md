# BubbleList

[BubbleList](https://element-plus-x.com/components/bubbleList/)

## Basic

:::demo
bubble-list/basic
:::

## TemplateType 扩展

templateType 定义了气泡内容的渲染方式。

BubbleList 默认提供 [VkMarkdwon](https://eralchen.github.io/vunk-markdown/zh-CN/guide/introduction) 作为默认的渲染模板，

但您可以创建自定义模板以实现特殊的渲染需求。

:::demo
bubble-list/template-type/index
>>>subs
[bubble-list/template-type/types, bubble-list/template-type/MyCustomRendererTemplate]
>>>
:::

:::details 旧版 Typewriter 模板

TIP 你可以自行添加 `Typewriter` 模板来兼容旧版

`import { VkBubbleRenderTemplate, VkBubbleData } from '@vunk/plus/components/bubble-templates'`

`VkBubbleRenderTemplate` 替换 `VkRendererTemplate` 用于定义模板

`VkBubbleData` 替换 `VkRendererData` 用于收集客户端组件数据

:::source
components\bubble-templates\src\legacy
:::

## Role 的用途

Role 用于定义消息气泡的发送者角色，可关联气泡的样式、位置和行为。

你可以通过 `.el-bubble.is-[role]` css 类名来进一步控制气泡的样式。

:::details 创建 Role 映射

```typescript
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'

type RoleMedia = __VkAgentChatProvider.RoleMediaBasic
  & (
  __VkBubbleTemplates.RenderItem
  | MyCustomTemplateSource // 引入自定义模板类型
)

export enum Role {
  User = 'user',
  Assistant = 'assistant',
  Broadcasting = 'broadcasting',
  // 添加自定义角色
  CustomRole = 'custom-role',
}
// 定义所有角色的配置
export const roleOptions: RoleMedia[] = [
  // 添加自定义角色配置
  {
    label: '自定义角色',
    value: Role.CustomRole,
    isMarkdown: true,
    placement: 'start', // 'start' 或 'end'，决定气泡在左侧还是右侧
    typing: true, // 是否显示打字效果
    templateType: 'Typewriter', // 使用的模板类型
  },
  // ...
]

// 创建角色映射表，用于快速查找
export const roleMap = roleOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<string, RoleMedia>)
```

:::

:::details 根据映射构建 BubbleItem

```typescript
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { roleMap } from './myRoles'

export const parser: __VkAgentChatProvider.Parser = (message) => {
  return [
    {
      ...message,
      ...roleMap[message.role],
      loading: message.seviceLoading,
    },
  ] as __VkAgentChatProvider.BubbleItem[]
}
```

:::

## BubbleList Props

:::props
bubble-list/src/ctx
:::

## BubbleList Slots

[BubbleList Slots](https://element-plus-x.com/components/bubbleList/#%E6%8F%92%E6%A7%BD)

| 名称    | 说明             | 作用域参数 |
| ------- | ---------------- | ---------- |
| avatar  | 自定义气泡头像区域 | - |
| header  | 自定义气泡头部区域 | - |
| loading | 自定义加载状态显示 | - |
| footer  | 自定义气泡底部区域 | - |
| renderer | 自定义气泡内容渲染 | - |

:::tip
这些插槽允许您完全自定义气泡列表中的不同部分，以满足特定的UI需求。
:::

::: details Types

:::source
components/bubble-list/src/types

:::
