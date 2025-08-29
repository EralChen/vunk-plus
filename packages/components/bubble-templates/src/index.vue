<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { PropType } from 'vue'
import type { MarkdownProps } from './types'
import { VkMarkdown } from '@vunk/markdown'
import { VkBubbleRenderTemplate } from './core'

defineOptions({
  name: 'VkBubbleTemplates',
})

defineProps({
  markdownProps: {
    type: Object as PropType<Partial<MarkdownProps>>,
    default: () => ({
      containers: ['thinking', 'echarts'],
    }),
  },
})
</script>

<template>
  <VkBubbleRenderTemplate type="VkMarkdown">
    <template #default="{ props }">
      <VkMarkdown
        :source="props.content"
        v-bind="markdownProps"
      ></VkMarkdown>
    </template>
  </VkBubbleRenderTemplate>
</template>

<style>
.vk-echart-x {
  height: 500px;
  width: 100%;
}
</style>
