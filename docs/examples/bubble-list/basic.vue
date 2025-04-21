<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { Role, VkBubbleList } from '@vunk-plus/components/bubble-list'

const bubbleItems: __VkBubbleList.Item[] = [
  {
    role: Role.User,
    content: '123',
    key: 'msg_0',
    placement: 'end',
    templateType: 'Typewriter',
  },
  {
    role: Role.Assistant,
    content: '123',
    key: 'msg_1',
    templateType: 'Typewriter',
  },
]
</script>

<template>
  <div class="h-500px">
    <VkBubbleList
      :items="bubbleItems"
    ></VkBubbleList>
  </div>
</template>
