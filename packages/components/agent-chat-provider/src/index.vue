<script lang="ts">
import type { AgentChatContext } from './types'
import { defineComponent } from 'vue'
import { initAgentChat } from './use'

export default defineComponent({
  name: 'VkAgentChatProvider',
  emits: {
    load: (e: AgentChatContext) => e,
  },
  setup (_, { slots, emit }) {
    const agentChat = initAgentChat()
    emit('load', agentChat)
    return slots.default
  },
})
</script>
