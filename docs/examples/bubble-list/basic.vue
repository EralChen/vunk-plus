<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { VkBubbleList } from '@vunk-plus/components/bubble-list'

const bubbleItems: __VkBubbleList.Item[] = [
  {
    role: 'assistant',
    content: '123',
  },
  {
    role: 'user',
    content: '123',
  },
]
</script>

<template>
  <VkBubbleList
    :items="bubbleItems"
  ></VkBubbleList>
</template>
