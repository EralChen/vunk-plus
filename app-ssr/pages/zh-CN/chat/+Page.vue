<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
import { 
  ChatgptSSEResponse, isDoneResponse, 
  isContentMessage,
} from '@vunk-plus/shared/chatgpt'

const source = ref('')
const typingPause = ref(false)
const currentEventSource = shallowRef<EventSource>()

function read () {
  currentEventSource.value?.close()
  source.value = ''
  typingPause.value = false
  const eventSource = new EventSource(import.meta.env.VITE_SSR_API_URL + '/chat/stream')
  eventSource.onmessage = (
    event:MessageEvent<string>,
  ) => {
    if (isDoneResponse(event.data)) {
      eventSource.close()
      return
    }
    const { message, error } = JSON.parse(event.data) as ChatgptSSEResponse
    if (error) {
      eventSource.close()
      return
    }
    if (isContentMessage(message)) {
      source.value = message.content.parts.join('')
      return 
    } 
  }
  currentEventSource.value = eventSource
}

function stop () {
  typingPause.value = true
  currentEventSource.value?.close()
}


</script>
<template>
  <p>
    <ElButton @click="read">
      生成
    </ElButton>
    <ElButton
      @click="stop"
    >
      终止
    </ElButton>
  </p>
  <VkTypingMarkdown
    :source="source"
    :pause="typingPause"
  ></VkTypingMarkdown>
</template>
