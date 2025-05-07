<script lang="ts" setup>
import type { __VkMetahumanBroadcasting } from '@vunk-plus/components/metahuman-broadcasting'
import { authentication, textToSpeech } from '#/api/application'
import { useWebSocket } from '@vueuse/core'
import { VkMetahumanBroadcasting } from '@vunk-plus/components/metahuman-broadcasting'
import { VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { reactive, ref, watchEffect } from 'vue'
import PixiFrame from './pixi-frame.vue'

function blobToDataURL (blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string) // result 是 base64 编码的 data URL
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
const text = `下面是一篇约 800 字的童话故事，适合儿童阅读:《月光下的小狐狸》`

const authenticationPromise = authentication({
  access_token: '859436e6e5fe3e63',
}).then((res) => {
  localStorage.setItem('accessToken', res)
})

const textToSpeechFn: __VkMetahumanBroadcasting.TextToSpeech = async (text) => {
  await authenticationPromise
  return textToSpeech({
    application_id: '1df6fc34-0483-11f0-ab5c-8e5d3c122c24',
    text,
  }).then((res) => {
    // blob 转 data url
    return blobToDataURL(res)
  })
}

const pause = ref(true)

const { status, data, send, open, close } = useWebSocket('ws://localhost:8001/ws', {
  autoReconnect: true,
})

const frameUrls = reactive<string[]>([])
watchEffect(() => {
  const json = JSON.parse(data.value)
  if (json?.type === 'frame') {
    const url = `data:image/jpeg;base64,${json.frame_data}`
    frameUrls.push(url)
  }
  else if (json?.type === 'streaming_complete') {
    pause.value = false
  }
})

function audioSend (dataUrl: string) {
  const message = {
    mode: 'start_from_position',
    audio_data: dataUrl.split(',').slice(1).join(),
  }
  send(JSON.stringify(message))
}
</script>

<template>
  <VkMetahumanBroadcasting
    :text-to-speech="textToSpeechFn"
    :source="text"
    :send="audioSend"
    :pause="pause"
  >
  </VkMetahumanBroadcasting>

  <p>
    <ElButton @click="pause = false">
      play
    </ElButton>

    <ElButton @click="() => console.log(frameUrls)">
      log
    </ElButton>
  </p>

  <div h-600px w-400px>
    <VkPixiFrame
      v-if="!pause"
      :data="frameUrls"
    ></VkPixiFrame>
  </div>
</template>
