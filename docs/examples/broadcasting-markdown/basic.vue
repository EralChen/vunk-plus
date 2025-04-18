<script lang="ts" setup>
import type {

  __VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import {
  Broadcast,
  VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { setData } from '@vunk/core'
import { computed, ref } from 'vue'
import { MetahumanStatus } from './metahuman-background/const'
import MetahumanBackground from './metahuman-background/index.vue'

const text = `下面是一篇约 800 字的童话故事，适合儿童阅读：

---

**《月光下的小狐狸》**

`

const paragraphs = ref<__VkBroadcastingMarkdown.Paragraph[]>([])

const metahumanStatus = computed(() => {
  const speaking = paragraphs.value.some((item) => {
    return item.broadcast === Broadcast.playing
  })
  return speaking
    ? MetahumanStatus.SPEAKING
    : MetahumanStatus.SILENT
})

const currentIndex = ref(0)
const theText = computed(() => {
  return text.substring(0, currentIndex.value)
})
const pause = ref(false)

setInterval(() => {
  if (currentIndex.value < text.length) {
    currentIndex.value += 3
  }
}, 50)
</script>

<template>
  <ElButton @click="pause = !pause">
    {{ pause ? '继续' : '暂停' }}
  </ElButton>

  <div h-600px>
    <MetahumanBackground
      :status="metahumanStatus"
    >
      <div
        pos-absolute bottom-0 z-2 top-350px bg-white
        left-0 right-0
      >
        <ElScrollbar w-full>
          <VkBroadcastingMarkdown
            :source="theText"
            :pause="pause"
          >
          </VkBroadcastingMarkdown>
        </ElScrollbar>
      </div>
    </MetahumanBackground>
  </div>
</template>
