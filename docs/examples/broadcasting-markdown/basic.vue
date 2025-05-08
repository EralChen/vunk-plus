
<script lang="ts" setup>
import { authentication, textToSpeech } from '#/api/application'
import {
  VkBroadcastingMarkdown,
  __VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { blobToDataURL } from '@vunk/shared/data'

const text = `下面是一篇约 800 字的童话故事，适合儿童阅读:《月光下的小狐狸》`

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

</script>

<template>
  <VkBroadcastingMarkdown
    :source="text"
    :text-to-speech="textToSpeechFn"
  >
  </VkBroadcastingMarkdown>
</template>
