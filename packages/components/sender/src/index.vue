<script lang="tsx">
import type { UploadChangeParam, UploadFile } from 'ant-design-vue'
import type { AttachmentsProps } from 'ant-design-x-vue'
import type { AttachmentsRef } from 'ant-design-x-vue/dist/typings/attachments/interface'
import type { Ref } from 'vue'
import type {} from 'vue-types'
import { CloudUploadOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons-vue'
import { useDeferred, useModelComputed } from '@vunk/core/composables'
import { Button as AntButton, Tooltip } from 'ant-design-vue'
import { Attachments, Sender } from 'ant-design-x-vue'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { emits, props } from './ctx'
import SenderHeader from './SenderHeader.vue'

export default defineComponent({
  name: 'VkSender',
  components: {
    Sender,
    LinkOutlined,
    AntButton,
    Attachments,
    SenderHeader,
  },
  props,
  emits,
  setup (props, { emit, slots }) {
    const hasAttachments = computed(() => props.modules.includes('Attachments'))

    const loading = useModelComputed({
      key: 'loading',
      default: false,
    }, props, emit)

    /* header */
    const headerOpen = ref(false)
    /* header End */

    /* UI */
    const actionsRender = (_, info) => {
      const { SendButton, LoadingButton } = info.components

      const loadingRender = () => {
        return (
          <Tooltip title="点击取消">
            <LoadingButton />
          </Tooltip>
        )
      }
      const sendRender = () => {
        return (
          <SendButton
            type="text"
            icon={<SendOutlined />}
          />
        )
      }

      const sendAction = () => loading.value
        ? loadingRender()
        : sendRender()

      return (
        <div class="vk-sender-actions">
          <div class="vk-sender-actions__before">
            { slots.actions_before?.() }
          </div>
          <div class="vk-sender-actions__after">
            { slots.actions_after?.() }
            { sendAction() }
          </div>
        </div>
      )
    }

    const attachmentsPlaceholder: AttachmentsProps['placeholder'] = (type) => {
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
    // [TODO] 文件粘贴的参数可能在未来会有变化
    // https://x.ant.design/components/sender-cn#sender-demo-paste-image
    const handlePasteFile = async (file: File) => {
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
    const handleChange = (e: UploadChangeParam<UploadFile>) => {
      theFileList.value = e.fileList
    }
    /* FileList END */

    return {
      hasAttachments,
      actionsRender,
      headerOpen,
      attachmentsPlaceholder,
      handlePasteFile,
      attachmentsRef,
      theFileList,
      handleChange,
      attachmentWrapResolve: attachmentWrapDef.resolve,
    }
  },
})
</script>

<template>
  <Sender
    class="vk-sender"
    :value="modelValue"
    :loading="loading"
    :allow-speech="true"
    :actions="actionsRender"
    :on-submit="(e) => $emit('submit', e)"
    :on-cancel="() => $emit('cancel')"
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
          @change="handleChange"
        ></Attachments>
      </SenderHeader>
    </template>
    <template #prefix>
      <AntButton
        v-if="hasAttachments"
        type="text"
        @click="headerOpen = !headerOpen"
      >
        <template #icon>
          <LinkOutlined></LinkOutlined>
        </template>
      </AntButton>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </Sender>
</template>

<style>
/* .vk-sender .ant-sender-content{
  display: grid;
  grid-template-columns: auto 1fr;
}
.vk-sender .ant-sender-actions-list {
  margin-top: 1em;
  grid-column: 1 / -1;
} */
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
