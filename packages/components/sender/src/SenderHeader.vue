<script lang="tsx">
import type { AnyFunc } from '@vunk/shared'
import type { PropType } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { noop } from '@vunk/shared/function'
import { Button as AntButton } from 'ant-design-vue'
import { ElCollapseTransition } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AXSenderHeader',
  components: {
    ElCollapseTransition,
    AntButton,
    CloseOutlined,
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Sender',
    },
    contentRef: {
      type: Function as PropType<AnyFunc>,
      default: noop,
    },
  },
  emits: {
    'update:modelValue': null,
  },
  setup () {
    return {
    }
  },
})
</script>

<template>
  <ElCollapseTransition>
    <div
      v-show="modelValue" class="ant-sender-header"
      v-bind="$attrs"
    >
      <div class="ant-sender-header-header">
        <div class="ant-sender-header-header-title">
          {{ title }}
        </div>
        <div class="ant-sender-header-header-close">
          <AntButton
            type="text"
            size="small"
            @click="$emit('update:modelValue', false)"
          >
            <template #icon>
              <CloseOutlined />
            </template>
          </AntButton>
        </div>
      </div>
      <div :ref="contentRef" class="ant-sender-header-content">
        <slot></slot>
      </div>
    </div>
  </ElCollapseTransition>
</template>

<style>
.ant-sender-header-header{
  display: flex;
  justify-content: space-between;
}
</style>
