<script lang="ts" setup>
import type {
  __VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { authentication, textToSpeech } from '#/api/application'
import {
  VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { blobToDataURL } from '@vunk/shared/data'
import { TickerStatus } from '@vunk/shared/enum'
import { ref } from 'vue'

const text = `

大自然里，草长莺飞，莺歌燕舞，她生活在一个美好的世界里。

然而，当她经过茧里的痛苦与挣扎，终于破茧而出时，却不是一只在空中轻盈飞舞的花蝴蝶，而是蜕变成为了一只灰色的小飞蛾。

在同伴的叹息中，她笑着流下了激动的泪水，微笑着说：“上帝给了我生命，就是宝贵的，渺小的我也依然能够在这个美丽的世界中划上一抹绚丽的色彩，做一只用于扑火的飞蛾，又何乐而不为呢？”

没有翅膀的飞翔更接近天堂，有些美丽是不需要书写的。

`
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
const status = ref(TickerStatus.pending)
</script>

<template>
  {{ status }}
  <VkBroadcastingMarkdown
    v-model:status="status"
    :source="text"
    :text-to-speech="textToSpeechFn"
  >
  </VkBroadcastingMarkdown>
</template>
