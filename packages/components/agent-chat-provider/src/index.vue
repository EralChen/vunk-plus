<script lang="ts">
import { defineComponent } from 'vue'
import { initAgentChat } from './use'

export default defineComponent({
  name: 'VkAgentChatProvider',
  setup (_, { slots }) {
    initAgentChat()
    return slots.default
  },
})
</script>
