<script lang="ts" setup>
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
const markdownText = `
# Hello\n\nThis is a **Markdown** message.\n\n- Item 1\n- Item 2
\`\`\`js
// 我的世界
console.log('Hello, World!')
\`\`\`

`

</script>
<template>
  <VkTypingMarkdown
    :source="markdownText"
    :delay="50"
  ></VkTypingMarkdown>
</template>