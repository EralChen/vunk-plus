<script lang="ts" setup>
import { VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkChatIndependent } from '@vunk-plus/components/chat-independent'
</script>

<template>
  <div h-500px w-350px>
    <VkAgentChatProvider>
      <VkChatIndependent></VkChatIndependent>
    </VkAgentChatProvider>
  </div>
</template>
