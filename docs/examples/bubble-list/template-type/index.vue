<script setup lang="ts">
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { MyCustomTemplateSource } from './types'
import { Role, VkBubbleList } from '@vunk-plus/components/bubble-list'
import MyCustomRendererTemplate from './MyCustomRendererTemplate.vue'

type Item = __VkBubbleList.Item<MyCustomTemplateSource>

const bubbleItems: Item[] = [
  {
    role: Role.User,
    content: '<div class="text-red">自定义渲染内容</div>',
    key: 'msg_0',
    placement: 'end',
    templateType: 'MyCustomTemplate',
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
  <div h-500px>
    <VkBubbleList
      :items="bubbleItems"
    >
      <template #renderer>
        <MyCustomRendererTemplate></MyCustomRendererTemplate>
      </template>
    </VkBubbleList>
  </div>
</template>
