<script lang="ts" setup>
import type { VNode } from 'vue'
import { VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import { VkRenderer } from '@vunk/core/components/renderer'
import { VkRendererTemplateInstancesProvider } from '@vunk/core/components/renderer-template-instances-provider'
import { VkSpreadTo } from '@vunk/core/components/spread-to'
import { ElAutoResizer } from 'element-plus'
import { BubbleList } from 'vue-element-plus-x'
import {
  // emits as dEmits,
  props as dProps,
} from './ctx'

defineOptions({
  name: 'VkBubbleList',
  inheritAttrs: false,
})
defineProps(dProps)
function getContentWraper (e: VNode) {
  return e.el
}
</script>

<template>
  <VkRendererTemplateInstancesProvider>
    <VkBubbleTemplates
      :text-to-speech="textToSpeech"
    ></VkBubbleTemplates>

    <slot name="renderer"></slot>

    <ElAutoResizer>
      <template #default="{ height }">
        <BubbleList
          :ref="elRef"
          :btn-icon-size="18"
          :max-height="`${height}px`"
          :style="{
            '--el-bubble-list-max-height': `${height}px`,
          }"
          :list="items"
          v-bind="$attrs"
        >
          <template v-if="$slots.avatar" #avatar="e">
            <slot v-bind="e" name="avatar"></slot>
          </template>
          <template v-if="$slots.header" #header="e">
            <slot v-bind="e" name="header"></slot>
          </template>
          <template v-if="$slots.loading" #loading="e">
            <slot v-bind="e" name="loading"></slot>
          </template>
          <template v-if="$slots.footer" #footer="e">
            <slot v-bind="e" name="footer"></slot>
          </template>

          <template #content="{ item }">
            <VkRenderer :source="[item]"></VkRenderer>
            <VkSpreadTo
              :target="getContentWraper"
              type="class"
              :data="{
                [`is-${item.role}`]: true,
              }"
            ></VkSpreadTo>
          </template>
        </BubbleList>
      </template>
    </ElAutoResizer>
  </VkRendererTemplateInstancesProvider>
</template>
