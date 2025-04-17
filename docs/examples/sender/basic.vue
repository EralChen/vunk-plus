<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue'
import type { Ref } from 'vue'
import { VkSender } from '@vunk-plus/components/sender'
import { VkSpeechButton } from '@vunk-plus/components/speech-button'
import { sleep } from '@vunk/shared/promise'
import { computed, ref } from 'vue'
import { speechToText } from './speechToText'

const text = ref('')
const loading = ref(false)
async function submit (_: string) {
  loading.value = true
  await sleep(10000)
  loading.value = false
  text.value = ''
}

/* 附件 */
const fileList = ref([]) as Ref<UploadFile[]>
const uploadedFiles = computed(() => {
  return fileList.value
    .filter(file => file.status === 'done')
    .map(item => item.response?.data[0].id)
})
/* 附件 END */

function cancel () {
  loading.value = false
}
function speechStop (blob: Blob) {
  speechToText('http://192.168.111.246:20096/speech-to-text', blob)
    .then((v) => {
      text.value += v
    })
}
</script>

<template>
  <div sk-flex="col-between" class="h-400px">
    <pre>
      {{ uploadedFiles }}
    </pre>
    <VkSender
      v-model:file-list="fileList"
      v-model="text"
      action="http://localhost:4545/upload"
      :loading="loading"
      @submit="submit"
      @cancel="cancel"
    >
      <template #footer>
        <ElButton round size="small">
          深度思考
        </ElButton>
      </template>
      <template #actions_before>
        <VkSpeechButton
          @stop="speechStop"
        />
      </template>
    </VkSender>
  </div>
</template>
