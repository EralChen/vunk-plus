<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { Role, VkBubbleList } from '@vunk-plus/components/bubble-list'
import { VkRendererTemplates } from '@vunk/markdown/components/strategy-renderer'
import { VkTemplateEcharts } from '@vunk/markdown/components/template-echarts'
import { VkTemplatesDefault } from '@vunk/markdown/components/templates-default'
import demotxt from './demo.txt?raw'

const bubbleItems: __VkBubbleList.Item[] = [
  {
    role: Role.User,
    content: '123',
    key: 'msg_0',
    placement: 'end',
    templateType: 'VkMarkdown',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    avatarSize: '32px',
  },
  {
    role: Role.Assistant,
    content: [
      '=================================================',
      ':::echarts',
      '```json',
      demotxt,
      '```',
      ':::',
    ].join('\n'),
    key: 'msg_1',
    templateType: 'VkMarkdown',
    avatar: 'https://avatars.githubusercontent.com/u/76239030?v=4',
    avatarSize: '32px',
  },
]
</script>

<template>
  <div class="h-500px">
    <VkRendererTemplates>
      <VkTemplatesDefault />
      <VkTemplateEcharts />

      <VkBubbleList
        :items="bubbleItems"
      >
        <template #footer="{ item }">
          {{ item }}
        </template>
      </VkBubbleList>
    </VkRendererTemplates>
  </div>
</template>
