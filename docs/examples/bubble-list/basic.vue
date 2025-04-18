<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { Role, VkBubbleList } from '@vunk-plus/components/bubble-list'

const bubbleItems: __VkBubbleList.Item[] = [
  {
    role: Role.User,
    content: '123',
  },
  {
    role: Role.Assistant,
    content: '123',
  },
]
</script>

<template>
  <VkBubbleList
    :items="bubbleItems"
  ></VkBubbleList>
</template>
