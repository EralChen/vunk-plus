<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { __VkIndependent } from '@vunk-plus/components/independent'
import { speechToText } from '@/api/application'
import { Role, VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkIndependent } from '@vunk-plus/components/independent'
import { setData } from '@vunk/core'
import { useDeferred } from '@vunk/core/composables'
import { useApplicationProfile } from '_c/authentication'
import { MetahumanBackground, MetahumanStatus } from '_c/metahuman-background'
import { computed, ref, shallowRef } from 'vue'

const {
  stt_model_enable,
  id: applicationId,
  prologue,
} = useApplicationProfile()

/* chat 数据  */
const bubbleData = ref<__VkBubbleList.RenderData>({})
const agentChatContext = useDeferred<__VkAgentChatProvider.AgentChatContext>()
const lastBubbleData = computed(() => {
  const lastBubble = agentChatContext.value?.simplicity.items.value.at(-1)
  if (lastBubble?.key && bubbleData.value[lastBubble.key]) {
    return bubbleData.value[lastBubble.key]
  }
  return {}
})
const broadcasting = computed(() => {
  return lastBubbleData.value.meta?.broadcasting === true
})
/* chat 数据  END */

/* 添加开场白 */
agentChatContext.promise.then(({ chat }) => {
  chat.setMessages([{
    id: 'prologue',
    message: {
      role: Role.Broadcasting,
      content: prologue,
      seviceEnd: true,
    },
    status: 'success',
  }])
})

/* 添加开场白 END */

/* 语音输入 */
const speechToTextFn: __VkIndependent.SpeechToText = (blob) => {
  // blob to file
  const file = new File([blob], 'audio.wav', {
    type: 'audio/wav',
  })
  return speechToText({
    application_id: applicationId,
    file,
  }).then(res => res.data)
}
/* 语音输入 END */
</script>

<template>
  <div h-full w-full pos-relative>
    <div position-absolute left-0 top-0 z-10>
      {{ lastBubbleData }}
    </div>
    <VkAgentChatProvider @load="agentChatContext.resolve">
      <VkIndependent
        class="home-independent"
        :data="bubbleData"
        :speech-to-text="stt_model_enable
          ? speechToTextFn
          : undefined"
        @set-data="setData(bubbleData, $event)"
      >
        <template #background>
          <MetahumanBackground
            :status="broadcasting
              ? MetahumanStatus.SPEAKING
              : MetahumanStatus.SILENT
            "
          ></MetahumanBackground>
        </template>
      </VkIndependent>
    </VkAgentChatProvider>
  </div>
</template>

<style>
.home-independent{
  overflow: hidden;
}
.home-independent .vk-independent-main__duplex{
  padding-top: 40vh;
}
.home-independent .el-bubble-list > .el-bubble:last-child {
  margin-bottom: 40px;
}
.home-independent .vk-independent-main__bubbles{

  /* mask-image: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1) 100%
  ); */

}
</style>
