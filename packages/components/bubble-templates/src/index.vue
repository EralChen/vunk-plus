<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { VkMarkdown } from '@vunk/markdown'
import { VkBubbleRenderTemplate } from './core'

defineOptions({
  name: 'VkBubbleTemplates',
})
</script>

<template>
  <VkBubbleRenderTemplate type="VkMarkdown">
    <template #default="{ props }">
      <VkMarkdown
        :source="props.content"
        :containers="['thinking']"
      ></VkMarkdown>
    </template>
  </VkBubbleRenderTemplate>
</template>
