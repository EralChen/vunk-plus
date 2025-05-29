<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { __VkChatIndependent } from '@vunk-plus/components/chat-independent'
import { speechToText, textToSpeech } from '@/api/application'
import { VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkChatIndependent } from '@vunk-plus/components/chat-independent'
import { TickerStatus, VkPixiFrameProvider, VkPixiFrameVideo } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { useDeferred } from '@vunk/core/composables'
import { blobToDataURL } from '@vunk/shared/data'
import { useApplicationProfile } from '_c/authentication'
import { MetahumanBackground, MetahumanStatus } from '_c/metahuman-background'
import { MetahumanBroadcastingRendererTemplate } from '_c/metahuman-broadcasting'
import { computed, ref } from 'vue'
import { parser } from './parser'
import { useRequest } from './useRequest'

const base = import.meta.env.BASE_URL || '/'
const videoUrl = ref(`${base}metahuman/F_SLT.mp4`)
const videoStatus = ref(TickerStatus.play)
const {
  stt_model_enable,
  id: applicationId,
} = useApplicationProfile()

const { ready, request } = useRequest()

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
const _lastBubbleData = computed(() => {
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
// agentChatContext.promise.then(({ chat }) => {
//   chat.setMessages([{
//     id: 'prologue',
//     message: {
//       role: Role.Broadcasting,
//       content: prologue.split('\n')[0] || prologue,
//       seviceEnd: true,
//       meta: {
//         metahumanStatus: MetahumanStatus.WELCOME,
//       },
//     },
//     status: 'success',
//   }])
// })
/* 添加开场白 END */

/* 语音输入输出 */
function textToSpeechFn (text: string) {
  return textToSpeech({
    application_id: applicationId,
    text,
  }).then((blob) => {
    return blobToDataURL(blob)
  })
}
const speechToTextFn: __VkChatIndependent.SpeechToText = (blob) => {
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
    <VkAgentChatProvider
      v-if="ready"
      :request="request"
      :parser="parser"
      @load="agentChatContext.resolve"
    >
      <VkPixiFrameProvider>
        <VkChatIndependent
          class="home-chat-independent"
          :data="bubbleData"
          :speech-to-text="stt_model_enable
            ? speechToTextFn
            : undefined"
          :text-to-speech="textToSpeechFn"
          @set-data="setData(bubbleData, $event)"
        >
          <template #bubble_renderer>
            <MetahumanBroadcastingRendererTemplate
              :text-to-speech="textToSpeechFn"
            />
          </template>
          <template #background>
            <!-- 设置静默的背景 -->
            <VkPixiFrameVideo
              v-model:status="videoStatus"
              :loop="true"
              :url="videoUrl"
            >
            </VkPixiFrameVideo>

            <MetahumanBackground
              :status="currentMetahumanStatus"
            ></MetahumanBackground>
          </template>
        </VkChatIndependent>
      </VkPixiFrameProvider>
    </VkAgentChatProvider>
  </div>
</template>

<style>
.home-chat-independent{
  overflow: hidden;
}
.home-chat-independent .vk-chat-independent-main__duplex{
  padding-top: 40vh;
}
.home-chat-independent .el-bubble-list > .el-bubble:last-child {
  margin-bottom: 40px;
}
.home-chat-independent .vk-chat-independent-main__bubbles{
   mask-image: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
