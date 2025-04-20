<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { __VkIndependent } from '@vunk-plus/components/independent'
import { cChatId, speechToText, textToSpeech } from '@/api/application'
import { Role, VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkIndependent } from '@vunk-plus/components/independent'
import { setData } from '@vunk/core'
import { useDeferred } from '@vunk/core/composables'
import { useApplicationProfile } from '_c/authentication'
import { MetahumanBackground, MetahumanStatus } from '_c/metahuman-background'
import { computed, ref, shallowRef } from 'vue'
import { createRequest } from './createRequest'

const {
  stt_model_enable,
  id: applicationId,
  prologue,
} = useApplicationProfile()

const request = shallowRef()
cChatId({
  application_id: applicationId,
}).then((res) => {
  request.value = createRequest({
    chatId: res.data,
  })
})

/* chat 数据  */
const bubbleData = ref<__VkBubbleList.RenderData>({})
const agentChatContext = useDeferred<__VkAgentChatProvider.AgentChatContext>()
const bubbleItems = computed(() => {
  return agentChatContext.value?.simplicity.items.value ?? []
})
function getBubbleDataAt (index: number) {
  const bubble = bubbleItems.value.at(index)
  if (bubble?.key && bubbleData.value[bubble.key]) {
    return bubbleData.value[bubble.key]
  }
  return {}
}
const lastBubbleData = computed(() => {
  return getBubbleDataAt(-1)
})
const currentBroadcasting = computed(() => {
  // 有没有  meta?.broadcasting === true
  return Object.values(bubbleData.value).find((bubble) => {
    return bubble.meta?.broadcasting === true
  })
})
const currentMetahumanStatus = computed(() => {
  if (!currentBroadcasting.value) {
    return MetahumanStatus.SILENT
  }
  return currentBroadcasting.value?.meta?.metahumanStatus ?? MetahumanStatus.SPEAKING
})
/* chat 数据  END */

/* 添加开场白 */
agentChatContext.promise.then(({ chat }) => {
  chat.setMessages([{
    id: 'prologue',
    message: {
      role: Role.Broadcasting,
      content: prologue.split('\n')[0] || prologue,
      seviceEnd: true,
      meta: {
        metahumanStatus: MetahumanStatus.WELCOME,
      },
    },
    status: 'success',
  }])
})
/* 添加开场白 END */

/* 语音输入输出 */
function textToSpeechFn (text: string) {
  return textToSpeech({
    application_id: applicationId,
    text,
  }).then((blob) => {
    const url = URL.createObjectURL(blob)
    return url
  })
}
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
/* 语音输入输出 END */
</script>

<template>
  <div h-full w-full pos-relative>
    <div position-absolute left-0 top-0 z-10>
      {{ currentBroadcasting }}
    </div>
    <VkAgentChatProvider
      v-if="request"
      :request="request"
      @load="agentChatContext.resolve"
    >
      <VkIndependent
        class="home-independent"
        :data="bubbleData"
        :speech-to-text="stt_model_enable
          ? speechToTextFn
          : undefined"
        :text-to-speech="textToSpeechFn"
        @set-data="setData(bubbleData, $event)"
      >
        <template #background>
          <MetahumanBackground
            :status="currentMetahumanStatus"
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

   mask-image: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1) 100%
  );

}
</style>
