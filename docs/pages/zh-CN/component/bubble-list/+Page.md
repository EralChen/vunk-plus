# BubbleList

[BubbleList](https://element-plus-x.com/components/bubbleList/)

## Basic

:::demo
bubble-list/basic
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

## Types

:::source
components/bubble-list/src/types
:::

## TemplateType 扩展

templateType 定义了气泡内容的渲染方式。BubbleList 默认提供了 [Typewriter](https://element-plus-x.com/components/typewriter/) 和 [VkBroadcastingMarkdown](../broadcasting-markdown/+Page.md) 两种渲染模板。

但您可以创建自定义模板以实现特殊的渲染需求。

:::demo
bubble-list/template-type/index
:::

### 创建自定义 templateType

首先，创建一个自定义的渲染组件：

```vue
<!-- MyCustomTemplate.vue -->
<template>
  <div class="my-custom-template">
    <!-- 自定义渲染内容 -->
    <div v-html="content"></div>
  </div>
</template>
```

创建一个 renderer-template 组件，使用 VkRendererTemplate 注册模板：

```vue
<!-- MyCustomRendererTemplate.vue -->
<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { SetDataEvent } from '@vunk/core'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { markRaw } from 'vue'
import MyCustomTemplate from './MyCustomTemplate.vue'

// 处理组件实例引用
function setRef (
  emitSetData: (e: SetDataEvent) => void,
  props: __VkBubbleList.Item,
  el: any,
) {
  emitSetData?.({
    k: [props.key, 'elRef'],
    v: markRaw(el),
  })
}

// 初始化渲染数据
function initRenderData (
  emitSetData: (e: SetDataEvent) => void,
  props: __VkBubbleList.Item,
) {
  emitSetData?.({
    k: [props.key, 'meta'],
    v: props.meta ?? {},
  })
  emitSetData?.({
    k: [props.key, 'templateType'],
    v: props.templateType,
  })
}
</script>

<template>
  <!-- 注册自定义模板类型 -->
  <VkRendererTemplate type="MyCustomTemplate">
    <template #default="{ props, emitSetData }">
      <MyCustomTemplate
        :ref="(el) => setRef(emitSetData, props, el)"
        :content="props.content"
        @vue:mounted="initRenderData(emitSetData, props)"
      ></MyCustomTemplate>
    </template>
  </VkRendererTemplate>
</template>
```

定义自定义模板的类型接口：

```typescript
import type { __VkRenderer } from '@vunk/core/components/renderer'
import type { VueComponentPropsType } from '@vunk/shared'
import type MyCustomTemplate from './MyCustomTemplate.vue'

// 定义自定义模板的类型
export interface MyCustomTemplateSource extends __VkRenderer.SourceItem, VueComponentPropsType<typeof MyCustomTemplate> {
  templateType: 'MyCustomTemplate' // 必须与 VkRendererTemplate 中的 type 属性匹配
}
```

### 实际使用示例

以下是一个完整的示例，展示了如何创建和使用自定模板：

**在组件中使用自定义模板**

```vue
<template>
  <VkBubbleList
    :items="items"
    :text-to-speech="textToSpeech"
  >
    <template #renderer>
      <MyCustomRendererTemplate></MyCustomRendererTemplate>
    </template>
  </VkBubbleList>
</template>
```

**配置消息使用自定义角色和模板**

```typescript
// 创建使用自定义角色和模板的消息
const messages = [
  {
    role: 'user',
    content: '你好！',
    key: '1',
  },
  {
    role: 'custom-role', // 自定义角色
    content: '这是使用自定义模板的消息',
    key: '2',
    templateType: 'MyCustomTemplate', // 指定使用自定义模板
  }
]
```

## Role 的用途

Role 用于定义消息气泡的发送者角色，可关联气泡的样式、位置和行为。

你可以通过 `.el-bubble.is-[role]` css 类名来进一步控制气泡的样式。

### 创建 Role 映射

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

### 构建 BubbleItem

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
