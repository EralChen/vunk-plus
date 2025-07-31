<script lang="ts">
import type { AnyFunc, NormalObject } from '@vunk/shared'
import type { PropType } from 'vue'
import type { AgentMessage, Parser, Request } from './types'
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

    const parser: Parser = (message) => {
      const list = [
        {
          ...message,
          loading: message.seviceLoading,
        },
      ]
      if (message.thinkingContent) {
        list.unshift({
          role: Role.Broadcasting,
          content: '您好，请让我先思考一下这个问题，再给您回答',
          seviceLoading: false,
          seviceEnd: true,
          loading: false,
          meta: {
            metahumanStatus: 2,
          },
        })
      }
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
