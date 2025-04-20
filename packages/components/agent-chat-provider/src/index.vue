<script lang="ts">
import type { AnyFunc, NormalObject } from '@vunk/shared'
import type { PropType } from 'vue'
import type { AgentChatContext, AgentMessage, Request } from './types'
import { defineComponent } from 'vue'
import { agentRequest } from './api'
import { Role } from './const-roles'
import { initAgentChat } from './use'

export default defineComponent({
  name: 'VkAgentChatProvider',
  props: {
    request: {
      type: Function as PropType<AnyFunc>,

    },
  },
  emits: {
    load: (e: AgentChatContext) => e,
  },
  setup (props, { slots, emit }) {
    const request: Request = (info, event) => {
      const { message } = info
      const { onSuccess, onUpdate } = event

      if (!message?.content) {
        return
      }

      let content = ''
      const role = Role.Broadcasting
      let thinkingContent = ''
      let thinkingStatus: AgentMessage['thinkingStatus'] = 'start'
      let seviceLoading = true
      const update = () => {
        onUpdate({
          role,
          content,
          thinkingContent,
          thinkingStatus,
          seviceLoading,
        })
      }
      const success = () => {
        onSuccess({
          role,
          content,
          thinkingContent,
          thinkingStatus,
          seviceLoading,
          seviceEnd: true,
        })
      }

      update()

      agentRequest((e) => {
        let json: NormalObject = {
          content: '',
          reasoning_content: '',
        }
        if (typeof e.data === 'string') {
          json = JSON.parse(e.data)
        }
        if (json.is_end) {
          success()
          return
        }

        if (json.reasoning_content) {
          thinkingContent += json.reasoning_content
          thinkingStatus = 'thinking'
          seviceLoading = false
          update()
        }

        if (json.content) {
          content += json.content
          seviceLoading = false
          update()
        }
        if (
          thinkingContent && json.content
        ) { // 思考完成
          thinkingStatus = 'end'
          update()
        }
      }, { message: message?.content })
    }
    const agentChat = initAgentChat(props.request ?? request)
    emit('load', agentChat)
    return slots.default
  },
})
</script>
