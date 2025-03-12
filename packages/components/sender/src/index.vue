<script lang="tsx">
import type { AttachmentsProps } from 'ant-design-x-vue'
import type { AttachmentsRef } from 'ant-design-x-vue/dist/typings/attachments/interface'
import type {} from 'vue-types'
import { CloudUploadOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons-vue'
import { useDeferred, useModelComputed } from '@vunk/core/composables'
import { Button as AntButton, Tooltip } from 'ant-design-vue'
import { Attachments, Sender } from 'ant-design-x-vue'
import { defineComponent, ref } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkSender',
  components: {
    Sender,
    LinkOutlined,
    AntButton,
    SenderHeader: Sender.Header as never,
    Attachments,
  },
  props,
  emits,
  setup (props, { emit, slots }) {
    const loading = useModelComputed({
      key: 'loading',
      default: false,
    }, props, emit)

    const headerOpen = ref(false)

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
          <Tooltip title={
            props.modelValue
              ? '点击发送'
              : '请输入内容'
          }
          >
            <SendButton
              type="text"
              icon={<SendOutlined />}
            />
          </Tooltip>
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
    const fileList = ref<File[]>([])
    // 文件粘贴
    const attachmentsDef = useDeferred<AttachmentsRef>()
    // [TODO] 文件粘贴的参数可能在未来会有变化
    // https://x.ant.design/components/sender-cn#sender-demo-paste-image
    const handlePasteFile = async (file: File) => {
      headerOpen.value = true
      const attachmentsNode = await attachmentsDef.promise
      attachmentsNode.upload(file)
    }
    /* FileList END */

    return {
      actionsRender,
      headerOpen,
      attachmentsPlaceholder,
      handlePasteFile,
      attachmentsResolve: attachmentsDef.resolve,
      fileList,
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
        :open="headerOpen"
        title="添加附件"
        @open-change="(v) => headerOpen = v"
      >
        <Attachments
          :ref="attachmentsResolve"
          :placeholder="attachmentsPlaceholder"
          :file-list="fileList"
        ></Attachments>
      </SenderHeader>
    </template>
    <template #prefix>
      <AntButton
        type="text"
        @click="headerOpen = !headerOpen"
      >
        <template #icon>
          <LinkOutlined></LinkOutlined>
        </template>
      </AntButton>
    </template>
  </Sender>
</template>

<style>
.vk-sender .ant-sender-content{
  display: grid;
  /* 两列 auto 1fr */
  grid-template-columns: auto 1fr;
}
.vk-sender .ant-sender-actions-list {
  margin-top: 1em;
  /* 独占两列 */
  grid-column: 1 / -1;
}
.vk-sender .ant-sender-prefix {
  /* 要素考上 */
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
