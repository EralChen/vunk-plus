<script lang="ts" setup>
import type { __VkMetahumanBroadcasting } from '@vunk-plus/components/metahuman-broadcasting'
import type { Ref } from 'vue'
import { authentication, textToSpeech } from '#/api/application'
import { useWebSocket } from '@vueuse/core'
import { ParagraphStatus } from '@vunk-plus/components/broadcasting-markdown'
import { VkMetahumanBroadcasting } from '@vunk-plus/components/metahuman-broadcasting'
import { TickerStatus, VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { type Deferred, waiting } from '@vunk/shared/promise'
import { reactive, ref, watchEffect } from 'vue'

function blobToDataURL (blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string) // result 是 base64 编码的 data URL
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
const text = `大自然里，草长莺飞，莺歌燕舞，她生活在一个美好的世界里。

然而，当她经过茧里的痛苦与挣扎，终于破茧而出时，却不是一只在空中轻盈飞舞的花蝴蝶，而是蜕变成为了一只灰色的小飞蛾。

在同伴的叹息中，她笑着流下了激动的泪水，微笑着说：“上帝给了我生命，就是宝贵的，渺小的我也依然能够在这个美丽的世界中划上一抹绚丽的色彩，做一只用于扑火的飞蛾，又何乐而不为呢？”

没有翅膀的飞翔更接近天堂，有些美丽是不需要书写的。`

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

const frameStatus = ref(TickerStatus.pending)
const paragraphData = ref([]) as Ref<__VkMetahumanBroadcasting.Paragraph[]>

const { data, send } = useWebSocket('ws://localhost:8001/ws', {
  autoReconnect: true,
})

const frameUrls = reactive<string[]>([])
watchEffect(() => {
  const json = JSON.parse(data.value)
  if (json?.type === 'frame') {
    const url = `data:image/jpeg;base64,${json.frame_data}`
    frameUrls.push(url)
  }
  else if (
    (json?.type === 'progress' && json.frame === 60)
    || json?.type === 'streaming_complete'
  ) {
    if (
      frameStatus.value === TickerStatus.playing
    ) {
      return
    }

    if (
      frameStatus.value === TickerStatus.pending
    ) {
      console.log('image play')
      frameStatus.value = TickerStatus.play
    }
    else if (
      paragraphData.value.some(
        item => item.status === ParagraphStatus.pending
          && item.broadcast !== TickerStatus.playing,
      )
    ) {
      console.log('image play')
      frameStatus.value = TickerStatus.play
    }
  }
})

function processingParagraph (
  item: __VkMetahumanBroadcasting.Paragraph,
) {
  if (!item.url) {
    return
  }
  const message = {
    mode: 'start_from_position',
    audio_data: item.url.split(',').slice(1).join(),
  }
  send(JSON.stringify(message))
}
function paragraphLoad ({ data }: {
  data: __VkMetahumanBroadcasting.Paragraph
}) {
  if (frameStatus.value === TickerStatus.playing) {
    console.log('paragraph play')
    return
  }

  data.broadcast = TickerStatus.pause

  waiting(
    () => frameStatus.value === TickerStatus.playing,
    20,
    1000,
  ).then(() => {
    console.log('paragraph play')
    data.broadcast = TickerStatus.play
  })
}
</script>

<template>
  <VkMetahumanBroadcasting
    :data="paragraphData"
    :text-to-speech="textToSpeechFn"
    :source="text"
    :processing="processingParagraph"
    @set-data="setData(paragraphData, $event)"
    @paragraph-load="paragraphLoad"
  >
  </VkMetahumanBroadcasting>

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
