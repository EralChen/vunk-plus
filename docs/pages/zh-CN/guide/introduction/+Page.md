# Introduction 介绍


`@vunk/plus` 会基于其他第三方库进行二次封装，提供更加易用的组件和工具。

## 安装
  
```bash
pnpm install @vunk/plus -S
```

如果你在使用组件的时候，发现缺失其他第三方库，自行安装即可。


## 使用

### 全局引入 css
```ts
import '@vunk/plus/index.css'
```

### 按需引入组件
```vue
<script lang="ts" setup>
import { VkTypingMarkdown } from '@vunk/plus/components/typing-markdown'
const markdownText = `
# Hello World
`
</script>
<template>
  <VkTypingMarkdown
    :source="markdownText"
  ></VkTypingMarkdown>
</template>
```
  
## 组件

你可以在 [组件](../../component/typing-markdown/+Page.md) 页面查看所有组件。
