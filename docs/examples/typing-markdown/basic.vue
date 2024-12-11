<script lang="ts" setup>
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
import { linkPlugin } from '@vunk/shared/markdown/plugins/linkPlugin'
import type MarkdownIt from 'markdown-it'

const markdownText = `
# Hello, World!
点击我 [跳转到百度](https://www.baidu.com)
`

const markdownItSetup = (md: MarkdownIt) => {
  md.use(linkPlugin, {
    target: '_blank',
  })
}

</script>
<template>
  <VkTypingMarkdown
    :source="markdownText"
    :delay="50"
    :markdown-it-setup="markdownItSetup"
  ></VkTypingMarkdown>
</template>