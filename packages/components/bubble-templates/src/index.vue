<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { BroadcastingMarkdownSource } from './types'
import { VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { Typewriter } from 'vue-element-plus-x'

defineOptions({
  name: 'VkBubbleTemplates',
})

const typed = (e: __VkBubbleList.Item) => e
</script>

<template>
  <VkRendererTemplate type="Typewriter">
    <template #default="{ props }">
      <Typewriter
        :content="props.content"
        :typing="props.typing"
        :is-markdown="props.isMarkdown"
        :is-fog="props.isFog"
      ></Typewriter>
    </template>
  </VkRendererTemplate>

  <VkRendererTemplate type="VkBroadcastingMarkdown">
    <template #default="{ props }">
      <VkBroadcastingMarkdown
        :source="props.content"
      ></VkBroadcastingMarkdown>
    </template>
  </VkRendererTemplate>
</template>
