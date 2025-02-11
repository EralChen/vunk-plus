<script lang="ts" setup>
import { VkSender } from '@vunk-plus/components/sender'
import { VkSpeechButton } from '@vunk-plus/components/speech-button'
import { sleep } from '@vunk/shared/promise'
import { ref } from 'vue'
import { createClient } from './createClient'
import { speechToText } from './speechToText'

const text = ref('')
const loading = ref(false)
async function submit (v: string) {
  console.log(v)
  loading.value = true
  await sleep(10000)
  loading.value = false
  text.value = ''
}
function cancel () {
  loading.value = false
}

function speechStop (blob: Blob) {
  speechToText(
    'http://192.168.111.246:20096/speech-to-text',
    blob,
  ).then((v) => {
    text.value += v
  })
}
</script>

<template>
  {{ loading }}
  <VkSender
    v-model="text"
    :loading="loading"
    @submit="submit"
    @cancel="cancel"
  >
    <template #actions_before>
      <ElButton round size="small">
        深度思考
      </ElButton>
    </template>
    <template #actions_after>
      <VkSpeechButton
        @stop="speechStop"
      />
    </template>
  </VkSender>
</template>
