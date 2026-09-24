<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { Role, VkBubbleList } from '@vunk-plus/components/bubble-list'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import testData from './test.json'

/**
 * 大纲导航 Demo
 *
 * 点击大纲项 → await scrollToBubble 跳转到对应消息。
 * 组件内置二段式精确定位，返回 Promise，调用方可 await。
 *
 * 回收的虚拟 item 标记为 data-visible="false"，DOM 查询时用
 * `[data-visible="true"]` 避免污染。
 */

const items = ref<__VkBubbleList.Item[]>(testData as any)
const bubbleListRef = ref<InstanceType<typeof VkBubbleList>>()
const activeIndex = ref(-1)

// 提取用户消息作为大纲
interface OutlineEntry {
  index: number
  title: string
}

const userMessages = computed<OutlineEntry[]>(() => {
  const result: OutlineEntry[] = []
  items.value.forEach((item, i) => {
    if (item.role === Role.User) {
      const raw = typeof item.content === 'string' ? item.content : ''
      const firstLine = raw.split('\n').find(Boolean) ?? ''
      result.push({
        index: i,
        title: firstLine.slice(0, 30) || `问题 #${result.length + 1}`,
      })
    }
  })
  return result
})

async function scrollToEntry(entry: OutlineEntry) {
  activeIndex.value = entry.index
  await bubbleListRef.value?.scrollToBubble(entry.index)
}
</script>

<template>
  <div class="flex gap-4 h-600px">
    <!-- 大纲导航 -->
    <div class="w-200px flex-shrink-0 border rounded p-3 overflow-y-auto bg-gray-50">
      <div class="text-sm font-semibold mb-2 text-gray-600">
        大纲（{{ userMessages.length }} 条问题）
      </div>
      <button
        v-for="entry in userMessages"
        :key="entry.index"
        class="w-full text-left px-2 py-1.5 rounded text-xs mb-1 transition-colors"
        :class="activeIndex === entry.index
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100'"
        @click="scrollToEntry(entry)"
      >
        {{ entry.title }}
      </button>
    </div>

    <!-- 气泡列表 -->
    <div class="flex-1 min-w-0 border rounded overflow-hidden">
      <VkBubbleList
        ref="bubbleListRef"
        :items="items"
        :virtual="true"
      />
    </div>
  </div>
</template>