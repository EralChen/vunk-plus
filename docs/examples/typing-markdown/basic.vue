<script lang="ts" setup>
import type MarkdownIt from 'markdown-it'
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
import { linkPlugin } from '@vunk/shared/markdown/plugins/linkPlugin'
import { ref } from 'vue'

const markdownText = ref(`
# Hello, World!
点击我 [跳转到百度](https://www.baidu.com)
`)

function markdownItSetup (md: MarkdownIt) {
  md.use(linkPlugin, {
    target: '_blank',
  })
}
</script>

<template>
  <VkTypingMarkdown
    :source="markdownText"
    :delay="60"
    :markdown-it-setup="markdownItSetup"
  ></VkTypingMarkdown>
</template>
