<script lang="tsx" setup>
import type { UploadFile } from 'ant-design-vue'
import type { Ref } from 'vue'
import { VkSender, VkSenderHeader } from '@vunk-plus/components/sender'
import { VkSpeechButton } from '@vunk-plus/components/speech-button'
import { sleep } from '@vunk/shared/promise'
import { ElButton } from 'element-plus'
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

/* Header */
const customHeaderVisible = ref(false)

/* Header END */

/* UI */
function createSendButton () {
  // 自定义自己的发送按钮
  return loading.value
    ? (
      <ElButton
        onClick={() => cancel()}
      >
        发送中...
      </ElButton>
    )
    : (
      <ElButton
        onClick={() => submit(text.value)}
      >
        发送
      </ElButton>
    )
}

const attachmentsVisible = ref(false)
function createAttachmentsButton () {
  // 自定义自己的附件按钮
  return (
    <ElButton
      onClick={() => {
        attachmentsVisible.value = !attachmentsVisible.value
      }}
    >
      附件
    </ElButton>
  )
}
/* UI END */
</script>

<template>
  <div sk-flex="col-between">
    <pre>
      {{ uploadedFiles }}
    </pre>
    <VkSender
      v-model:file-list="fileList"
      v-model="text"
      v-model:attachments-visible="attachmentsVisible"
      action="http://localhost:4545/upload"
      :loading="loading"
      :modules="['Attachments']"
      :auto-size="{
        minRows: 3,
        maxRows: 10,
      }"
      :create-send-button="createSendButton"
      :create-attachments-button="createAttachmentsButton"
    >
      <!-- 定义 footer -->
      <template #footer="{ sendButton, attachmentsButton }">
        <div sk-flex="row-between">
          <span>
            <component
              :is="attachmentsButton"
            />

            <ElButton
              @click="customHeaderVisible = !customHeaderVisible"
            >custom</ElButton>
          </span>

          <div sk-flex="row-center" sub:ml-m>
            <VkSpeechButton
              @stop="speechStop"
            />
            <component
              :is="sendButton"
            />
          </div>
        </div>
      </template>

      <!-- 重置 prefix -->
      <template #prefix></template>

      <!-- 重置 actions_after -->
      <template #actions_after></template>

      <template #header>
        <VkSenderHeader
          v-model="customHeaderVisible"
        >
          test
        </VkSenderHeader>
      </template>
    </VkSender>
  </div>
</template>
