<script lang="tsx" setup>
import type { AnyFunc, NormalObject } from '@vunk/shared'
import type { UploadChangeParam, UploadFile } from 'ant-design-vue'
import type { AttachmentsRef } from 'ant-design-x-vue/typings/attachments/interface'
import type { Ref } from 'vue'
import type {} from 'vue-types'
import { CloudUploadOutlined, LinkOutlined } from '@ant-design/icons-vue'
import { useDeferred, useModelComputed } from '@vunk/core/composables'
import { Button as AntButton } from 'ant-design-vue'
import { Attachments, Sender } from 'ant-design-x-vue'
import { computed, nextTick, ref } from 'vue'
import { props as dProps, emits } from './ctx'
import SenderHeader from './SenderHeader.vue'

defineOptions({
  name: 'VkSender',
})
const props = defineProps(dProps)
const emit = defineEmits(emits)
const slots = defineSlots()
const hasAttachments = computed(() => props.modules.includes('Attachments'))

const loading = useModelComputed({
  key: 'loading',
  default: false,
}, props, emit)

/* header */
const headerOpen = useModelComputed({
  key: 'attachmentsVisible',
  default: false,
}, props, emit)
/* header End */

/* UI */
function createSendButtonDefault (components: NormalObject = {}) {
  const { SendButton, LoadingButton } = components
  return loading.value
    ? <LoadingButton />
    : (
      <SendButton
        disabled={props.sendDisabled}
      />
    )
}
function createSendButton (components) {
  const fn = props.createSendButton || createSendButtonDefault
  return fn(components)
}

function createAttachmentsButtonDefault () {
  return (
    <AntButton
      type="text"
      onClick={() => headerOpen.value = !headerOpen.value}
    >
      {{
        icon: () => <LinkOutlined></LinkOutlined>,
      }}
    </AntButton>
  )
}

function createAttachmentsButton () {
  const fn = props.createAttachmentsButton || createAttachmentsButtonDefault
  return hasAttachments.value
    ? fn()
    : null
}

const actionsRender: AnyFunc = (_, info) => {
  const { SendButton, LoadingButton } = info.components

  const send = createSendButton({ SendButton, LoadingButton })

  return (
    <div class="vk-sender-actions">
      <div class="vk-sender-actions__before">
        { slots.actions_before?.() }
      </div>
      <div class="vk-sender-actions__after">
        { slots.actions_after?.() ?? send }
      </div>
    </div>
  )
}

const attachmentsPlaceholder: AnyFunc = (type) => {
  if (type === 'drop') {
    return {
      title: '请将文件拖到此处',
    }
  }
  else {
    return {
      icon: <CloudUploadOutlined />,
      title: '上传文件',
      description: '点击上传或拖拽文件到此处',
    }
  }
}
/* UI END */

/* FileList */
// 文件列表
const theFileList = useModelComputed({
  key: 'fileList',
  default: [] as UploadFile[],
}, props, emit)
// 文件粘贴
const attachmentsRef = ref() as Ref<AttachmentsRef>
const attachmentWrapDef = useDeferred<HTMLDivElement>()
const attachmentWrapResolve = attachmentWrapDef.resolve
// [TODO] 文件粘贴的参数可能在未来会有变化
// https://x.ant.design/components/sender-cn#sender-demo-paste-image
async function handlePasteFile (file: File) {
  headerOpen.value = true
  const attachmentWrap = await attachmentWrapDef.promise

  await nextTick()

  // [TODO] ant-design-x-vue 中 为完成 upload
  // attachmentsRef.value.upload(file)
  // 这里先手动实现
  const fileInput = attachmentWrap.querySelector('input[type="file"]') as HTMLInputElement

  if (fileInput) {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    fileInput.files = dataTransfer.files

    fileInput.dispatchEvent(new Event('change', { bubbles: true }))
  }
}
function handleChange (e: UploadChangeParam<UploadFile>) {
  theFileList.value = e.fileList
}
/* FileList END */
</script>

<template>
  <Sender
    class="vk-sender"
    :value="modelValue"
    :loading="loading"
    :allow-speech="true"
    :actions="actionsRender"
    :on-submit="(e) => {
      !sendDisabled && $emit('submit', e)
    }"
    :on-cancel="() => $emit('cancel')"
    :auto-size="autoSize"
    @update:value="$emit('update:modelValue', $event)"
    @paste-file="handlePasteFile"
  >
    <template #header>
      <SenderHeader
        v-if="hasAttachments"
        v-model="headerOpen"
        title="附件"
        :content-ref="attachmentWrapResolve"
      >
        <Attachments
          ref="attachmentsRef"
          :file-list="theFileList"
          :placeholder="attachmentsPlaceholder"
          :action="action"
          multiple
          v-bind="attachmentsProps"
          @change="handleChange"
        ></Attachments>
      </SenderHeader>

      <slot name="header"></slot>
    </template>

    <template #prefix>
      <component :is="createAttachmentsButton()" v-if="!$slots.prefix" />
      <slot name="prefix"></slot>
    </template>

    <template v-if="$slots.footer" #footer="{ info }">
      <slot
        name="footer"
        :send-button="createSendButton(info.components)"
        :attachments-button="createAttachmentsButton()"
        :info="info"
      ></slot>
    </template>
  </Sender>
</template>

<style>
.vk-sender .ant-sender-prefix {
  align-self: start;
}

.vk-sender-actions{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.vk-sender-actions__before,
.vk-sender-actions__after {
  display: flex;
  align-items: center;
}

.vk-sender-actions__before > * + *,
.vk-sender-actions__after > * + * {
  margin-left: 8px;
}
</style>
