<script lang="ts">
import type { AnyFunc, NormalObject } from '@vunk/shared'
import type { PropType } from 'vue'
import type { AgentMessage, Parser, Request, RequestOutput } from './types'
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
    parser: {
      type: Function as PropType<AnyFunc>,
    },
  },
  emits: {
    load: null,
  },
  setup (props, { slots, emit }) {
    const request: Request = (info, event) => {
      const { message } = info
      const { onSuccess, onUpdate } = event
      const chunks: RequestOutput[] = []

      if (!message?.content) {
        return
      }

      let content = ''
      const role = Role.Assistant
      let thinkingContent = ''
      let thinkingStatus: AgentMessage['thinkingStatus'] = 'start'
      let seviceLoading = true
      let seviceEnd = false
      const update = () => {
        const data = {
          role,
          content,
          thinkingContent,
          thinkingStatus,
          seviceLoading,
          seviceEnd,
        }
        onUpdate(data)
        chunks.push(data)
      }
      const success = () => {
        onSuccess(chunks)
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

        if (json.is_end) {
          seviceEnd = true
          update()
          success()
        }
      }, { message: message?.content })
    }

    const parser: Parser = (message) => {
      const list = [
        {
          ...message,
          loading: message.seviceLoading,
        },
      ]
      return list
    }

    const agentChat = initAgentChat(
      props.request ?? request,
      props.parser ?? parser,
    )

    emit('load', agentChat)
    return slots.default
  },
})
</script>
