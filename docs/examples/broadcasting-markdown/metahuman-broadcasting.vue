<script lang="ts" setup>
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { Ref } from 'vue'
import { authentication, textToSpeech } from '#/api/application'
import { useWebSocket } from '@vueuse/core'
import { ParagraphStatus, VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { TickerStatus, VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { blobToAudioWindow, StreamingInferenceService } from '@vunk-plus/shared/audioToFrames'
import { setData } from '@vunk/core'
import { blobToDataURL } from '@vunk/shared/data'
import { waiting } from '@vunk/shared/promise'
import { consola } from 'consola'
import { computed, onBeforeUnmount, reactive, ref, watchEffect } from 'vue'

const text = `大自然里，草长莺飞，莺歌燕舞，她生活在一个美好的世界里。

然而，当她经过茧里的痛苦与挣扎，终于破茧而出时，却不是一只在空中轻盈飞舞的花蝴蝶，而是蜕变成为了一只灰色的小飞蛾。

在同伴的叹息中，她笑着流下了激动的泪水。`

const authenticationPromise = authentication({
  access_token: '21c0f2a5067fb1cb',
}).then((res) => {
  localStorage.setItem('accessToken', res)
  sessionStorage.setItem('accessToken', res)
})

const textToSpeechFn: __VkBroadcastingMarkdown.TextToSpeech = async (text) => {
  await authenticationPromise
  return textToSpeech({
    application_id: '2c0946f4-02f0-11f0-b881-0242ac170002',
    text,
  }).then((res) => {
    // blob 转 data url
    return res
  })
}

const streamingInferenceService = new StreamingInferenceService(`${import.meta.env.BASE_URL}sophontalk/model.onnx`)

const frameStatus = ref(TickerStatus.pending)
const paragraphData = ref([]) as Ref<__VkBroadcastingMarkdown.Paragraph[]>

const frameUrls = reactive<string[]>([])

function processingParagraph (
  item: __VkBroadcastingMarkdown.Paragraph,
) {
  if (!item.blob) {
    return
  }

  blobToAudioWindow(item.blob, {
    onChunkComplete (result) {
      streamingInferenceService.addChunk(result)
    },
    onComplete (totalDimensions) {
      streamingInferenceService.finishAddingChunks()
    },
  })
  // onFrame img =>

  // 发送音频文件
  consola.info('Processing Paragraph', item.blob)
}
function paragraphLoad ({ data }: {
  data: __VkBroadcastingMarkdown.Paragraph
}) {
  consola.info('Paragraph Load', data)
}
function paragraphCompleted (v: boolean) {
  if (v && paragraphData.value.length) {
    frameStatus.value = TickerStatus.stop
    frameUrls.length = 0
  }
}
</script>

<template>
  <VkBroadcastingMarkdown
    :data="paragraphData"
    :text-to-speech="textToSpeechFn"
    :source="text"
    :processing="processingParagraph"
    @set-data="setData(paragraphData, $event)"
    @paragraph-load="paragraphLoad"
    @update:completed="paragraphCompleted"
  >
  </VkBroadcastingMarkdown>

  <p>
    <ElButton @click="() => console.log(paragraphData)">
      paragraphData
    </ElButton>
    {{ frameStatus }}
    <ElButton @click="() => console.log(frameUrls)">
      frameUrls
    </ElButton>
  </p>

  <div h-600px w-400px>
    <!-- <VkPixiFrame
      v-model:status="frameStatus"
      :data="frameUrls"
    ></VkPixiFrame> -->
  </div>
</template>
