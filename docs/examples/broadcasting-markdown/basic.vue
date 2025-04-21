<script lang="ts" setup>
import {
  VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { ref } from 'vue'

const text = `下面是一篇约 800 字的童话故事，适合儿童阅读:《月光下的小狐狸》`

const pause = ref(false)
</script>

<template>
  <ElButton @click="pause = !pause">
    {{ pause ? '继续' : '暂停' }}
  </ElButton>

  <div h-600px>
    <ElScrollbar w-full>
      <VkBroadcastingMarkdown
        :web-speech="true"
        :source="text"
        :pause="pause"
      >
      </VkBroadcastingMarkdown>
    </ElScrollbar>
  </div>
</template>
