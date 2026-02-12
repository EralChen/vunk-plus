<script lang="ts" setup>
import {
  VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { TickerStatus } from '@vunk/shared/enum'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { textToSpeech } from './api'

const fullMarkdown = `**回答错误！**  
正确答案是：**C) 硬盘**

**解析：**  
微型计算机的**主机**部分主要包括CPU、内存和主板（含芯片组等核心电路），而硬盘属于外部存储设备，通常归类为外设或辅助存储，不属于主机内部核心组成部分。

---  
（等待用户继续输入“开始答题”或“结束答题”）`

const status = ref(TickerStatus.play)
const keepRead = ref(true)
const source = ref('')

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  let cursor = 0
  timer = setInterval(() => {
    if (cursor >= fullMarkdown.length) {
      keepRead.value = false
      if (timer) {
        clearInterval(timer)
      }
      return
    }

    const step = 4
    source.value += fullMarkdown.slice(cursor, cursor + step)
    cursor += step
  }, 100)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  {{ status }}
  <span>keepRead: {{ keepRead }}</span>

  <ElButton @click="status = TickerStatus.stop">
    停止
  </ElButton>

  <!-- 暂停 -->
  <ElButton @click="status = TickerStatus.pause">
    暂停
  </ElButton>

  <!-- 播放 -->
  <ElButton @click="status = TickerStatus.play">
    播放
  </ElButton>

  <VkBroadcastingMarkdown
    v-model:status="status"
    :source="source"
    :keep-read="keepRead"
    :text-to-speech="textToSpeech"
  >
    <template #default="{ paragraphs }">
      <ElButton
        @click="console.log('点击了段落：', paragraphs)"
      >
        paragraph
      </ElButton>
    </template>
  </VkBroadcastingMarkdown>
</template>
