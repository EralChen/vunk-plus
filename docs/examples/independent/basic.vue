<script lang="ts" setup>
import { VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkIndependent } from '@vunk-plus/components/independent'
</script>

<template>
  <div h-500px w-350px>
    <VkAgentChatProvider>
      <VkIndependent></VkIndependent>
    </VkAgentChatProvider>
  </div>
</template>
