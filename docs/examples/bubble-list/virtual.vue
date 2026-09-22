<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { Role, VkBubbleList } from '@vunk-plus/components/bubble-list'
import { ref } from 'vue'

/**
 * 生成大量测试数据，展示虚拟列表性能优势
 */
function generateItems(count: number): __VkBubbleList.Item[] {
  const roles = [Role.User, Role.Assistant]
  const contents = [
    '你好！这是一条简短的消息。',
    '这是一段比较长的文本内容，用来展示虚拟列表中不同高度的气泡是如何被正确测量的。`虚拟列表`只渲染可视区域内的元素，大幅提升渲染性能。',
    '## Markdown 标题\n\n- 列表项 1\n- 列表项 2\n- 列表项 3\n\n> 引用块：虚拟列表让你的聊天界面更流畅！',
    [
      '```javascript',
      '// 代码块示例',
      'const list = Array.from({ length: 10000 }, (_, i) => ({',
      '  id: i,',
      '  role: i % 2 === 0 ? "user" : "assistant",',
      '  content: `消息 #${i}`',
      '}))',
      '```',
    ].join('\n'),
    '只是一个表情 😄',
    [
      '| 特性 | 说明 |',
      '|------|------|',
      '| 虚拟列表 | 只渲染可视项 |',
      '| 动态高度 | ResizeObserver 测量 |',
      '| 二分查找 | O(log n) 定位 |',
    ].join('\n'),
    '虚拟列表通过只渲染可视区域内的 DOM 节点，\n\n有效降低了内存占用和重排开销。\n\n对于成千上万条消息的聊天场景，\n\n性能提升非常明显。',
  ]

  return Array.from({ length: count }, (_, i) => {
    const role = roles[i % 2]
    return {
      role,
      content: contents[i % contents.length],
      key: `virt_msg_${i}`,
      templateType: 'VkMarkdown' as const,
      placement: role === Role.User ? 'end' : 'start',
      avatar: role === Role.User
        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        : 'https://avatars.githubusercontent.com/u/76239030?v=4',
      avatarSize: '32px',
    }
  })
}

const count = ref(1000)
const items = ref(generateItems(count.value))
const targetIndex = ref(500)
const bubbleListRef = ref<InstanceType<typeof VkBubbleList>>()

function regenerate() {
  items.value = generateItems(count.value)
}

function jumpTo() {
  bubbleListRef.value?.scrollToBubble(targetIndex.value)
}
</script>

<template>
  <div class="flex flex-col gap-4 h-600px">
    <div class="flex items-center gap-3 p-2 bg-gray-50 rounded">
      <span class="text-sm text-gray-600">消息数量：</span>
      <select
        v-model="count"
        class="px-2 py-1 border rounded text-sm"
        @change="regenerate"
      >
        <option :value="100">100 条</option>
        <option :value="500">500 条</option>
        <option :value="1000">1000 条</option>
        <option :value="5000">5000 条</option>
        <option :value="10000">10000 条</option>
      </select>
      <span class="text-xs text-gray-400">
        开启虚拟列表后，DOM 中仅渲染可视区域 + 缓冲区约 20~30 个节点
      </span>
      <span class="flex-1" />
      <span class="text-sm text-gray-600">跳转到第</span>
      <input
        v-model.number="targetIndex"
        type="number"
        :max="count - 1"
        min="0"
        class="w-20 px-2 py-1 border rounded text-sm"
      />
      <span class="text-sm text-gray-600">条</span>
      <button
        class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        @click="jumpTo"
      >
        跳转
      </button>
    </div>

    <div class="flex-1 min-h-0 border rounded overflow-hidden">
      <VkBubbleList
        ref="bubbleListRef"
        :items="items"
        :virtual="true"
      />
    </div>
  </div>
</template>