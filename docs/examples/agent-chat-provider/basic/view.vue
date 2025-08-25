<script lang="ts" setup>
import { useAgentChat } from '@vunk-plus/components/agent-chat-provider'
import { VkBubbleList } from '@vunk-plus/components/bubble-list'
import { computed, ref } from 'vue'

const { chat, simplicity } = useAgentChat()
const bubbleList = computed(() => simplicity.items.value)

chat.setMessages([
  {
    id: 'msg_0',
    message: {
      role: 'assistant',
      content: '你好，我是一个AI助手，请问有什么可以帮助你？',
      seviceLoading: false,
      seviceEnd: true,
    },
    status: 'success',
  },
])

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
