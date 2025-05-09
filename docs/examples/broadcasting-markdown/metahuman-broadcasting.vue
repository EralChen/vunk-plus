<script lang="ts" setup>
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { Ref } from 'vue'
import { authentication, textToSpeech } from '#/api/application'
import { useWebSocket } from '@vueuse/core'
import { ParagraphStatus, VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { TickerStatus, VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { blobToDataURL } from '@vunk/shared/data'
import { waiting } from '@vunk/shared/promise'
import { consola } from 'consola'
import { computed, onBeforeUnmount, reactive, ref, watchEffect } from 'vue'

const text = `
大自然里，草长莺飞，莺歌燕舞，她生活在一个美好的世界里。

然而，当她经过茧里的痛苦与挣扎，终于破茧而出时，却不是一只在空中轻盈飞舞的花蝴蝶，而是蜕变成为了一只灰色的小飞蛾。

在同伴的叹息中，她笑着流下了激动的泪水。`

const authenticationPromise = authentication({
  access_token: '859436e6e5fe3e63',
}).then((res) => {
  localStorage.setItem('accessToken', res)
})

const textToSpeechFn: __VkBroadcastingMarkdown.TextToSpeech = async (text) => {
  await authenticationPromise
  return textToSpeech({
    application_id: '1df6fc34-0483-11f0-ab5c-8e5d3c122c24',
    text,
  }).then((res) => {
    // blob 转 data url
    return blobToDataURL(res)
  })
}

const frameStatus = ref(TickerStatus.pending)
const paragraphData = ref([]) as Ref<__VkBroadcastingMarkdown.Paragraph[]>

const isParagraphUnplayed = computed(() => {
  return paragraphData.value.some(
    item => item.status === ParagraphStatus.pending
      && item.broadcast !== TickerStatus.playing,
  )
})

const { data, send, close } = useWebSocket('ws://localhost:8001/ws', {
  autoReconnect: true,
})

onBeforeUnmount(() => {
  close()
})

const frameUrls = reactive<string[]>([])

watchEffect(() => {
  const json = JSON.parse(data.value)
  if (!json) {
    return
  }

  if (json.type === 'frame') { // 添加帧数据
    const url = `data:image/jpeg;base64,${json.frame_data}`
    frameUrls.push(url)
    consola.info('Frame Data', json, frameUrls.length)
    return
  }

  if ( // 选择一个合适的时机（有足够的缓冲帧）开始播放
    (json.type === 'progress' && json.frame === 120)
    || json.type === 'streaming_complete'
  ) {
    if (
      frameStatus.value === TickerStatus.playing
      || frameUrls.length === 0
    ) {
      return
    }

    if ( // 帧或者段落未播放时, 重新激活播放
      frameStatus.value === TickerStatus.pending
      || frameStatus.value === TickerStatus.stopped
      || isParagraphUnplayed.value
    ) {
      frameStatus.value = TickerStatus.play
    }
  }
})

function processingParagraph (
  item: __VkBroadcastingMarkdown.Paragraph,
) {
  if (!item.url) {
    return
  }
  const message = {
    mode: 'start_from_position',
    audio_data: item.url.split(',').slice(1).join(),
  }
  consola.info('Processing Paragraph', message)
  send(JSON.stringify(message))
}
function paragraphLoad ({ data }: {
  data: __VkBroadcastingMarkdown.Paragraph
}) {
  if (frameStatus.value === TickerStatus.playing) {
    return
  }

  data.broadcast = TickerStatus.pause
  waiting(
    () => frameStatus.value === TickerStatus.playing,
    10,
    2000,
  ).then(() => {
    consola.info('Broadcast Play', Date.now())
    data.broadcast = TickerStatus.play
  })
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
    <VkPixiFrame
      v-model:status="frameStatus"
      :data="frameUrls"
    ></VkPixiFrame>
  </div>
</template>
