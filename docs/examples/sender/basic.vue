<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue'
import type { Ref } from 'vue'
import { VkSender, VkSenderHeader } from '@vunk-plus/components/sender'
import { sleep } from '@vunk/shared/promise'
import { computed, ref } from 'vue'
import { speechToText } from './speechToText'

const text = ref('')
const loading = ref(false)
async function submit (_: string) {
  loading.value = true
  await sleep(1000)
  loading.value = false
  text.value = ''
}

/* 附件 */
const fileList = ref([]) as Ref<UploadFile[]>
// const uploadedFiles = computed(() => {
//   return fileList.value
//     .filter(file => file.status === 'done')
//     .map(item => item.response?.data[0].id)
// })
/* 附件 END */

function cancel () {
  loading.value = false
}
</script>

<template>
  <div sk-flex="col-between">
    <pre>
      {{ fileList }}
    </pre>
    <VkSender
      v-model:file-list="fileList"
      v-model="text"
      action="http://localhost:4545/upload"
      :loading="loading"
      :modules="['Attachments']"
      :auto-size="{
        minRows: 1,
        maxRows: 3,
      }"
      :attachments-props="{
        data: {
          type: 'debug',
        },
        headers: {
          'x-debug': 'true',
        },
      }"
      @submit="submit"
      @cancel="cancel"
    >
    </VkSender>
  </div>
</template>
