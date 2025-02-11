<script lang="tsx">
import { SendOutlined } from '@ant-design/icons-vue'
import { useModelComputed } from '@vunk/core/composables'
import { Tooltip } from 'ant-design-vue'
import { Sender } from 'ant-design-x-vue'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkSender',
  components: {
    Sender,
  },
  props,
  emits,
  setup (props, { emit, slots }) {
    const loading = useModelComputed({
      key: 'loading',
      default: false,
    }, props, emit)

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
    return {
      actionsRender,
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
  >
  </Sender>
</template>

<style>
.vk-sender .ant-sender-content{
  display: block;
}
.vk-sender .ant-sender-actions-list {
  margin-top: 1em;
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
