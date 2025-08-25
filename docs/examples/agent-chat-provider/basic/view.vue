<script lang="ts" setup>
import { useAgentChat } from '@vunk-plus/components/agent-chat-provider'
import { VkBubbleList } from '@vunk-plus/components/bubble-list'
import { computed, ref } from 'vue'

const { chat, simplicity } = useAgentChat()
const bubbleList = computed(() => simplicity.items.value)

function handleClick () {
  chat.onRequest({
    message: {
      role: 'user',
      content: '直接讲一个300字童话故事',
      seviceEnd: true,
      seviceLoading: false,
    },
  })
}
</script>

<template>
  <ElButton
    @click="handleClick"
  >
    发送
  </ElButton>
  <div h-400px>
    <VkBubbleList
      :items="bubbleList"
    ></VkBubbleList>
  </div>
</template>
