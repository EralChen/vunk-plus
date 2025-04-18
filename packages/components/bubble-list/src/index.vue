<script lang="ts" setup>
import { VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import { VkRenderer } from '@vunk/core/components/renderer'
import { VkRendererTemplateInstancesProvider } from '@vunk/core/components/renderer-template-instances-provider'
import { ElAutoResizer } from 'element-plus'
import { BubbleList } from 'vue-element-plus-x'
import { emits as dEmits, props as dProps } from './ctx'

defineOptions({
  name: 'VkBubbleList',
  inheritAttrs: false,
})
defineProps(dProps)
</script>

<template>
  <VkRendererTemplateInstancesProvider>
    <VkBubbleTemplates></VkBubbleTemplates>

    <ElAutoResizer>
      <template #default="{ height }">
        <BubbleList
          :ref="elRef"
          :btn-icon-size="18"
          :max-height="`${height}px`"
          :list="items"
          v-bind="$attrs"
        >
          <template #content="{ item }">
            <VkRenderer :source="[item]"></VkRenderer>
          </template>
        </BubbleList>
      </template>
    </ElAutoResizer>
  </VkRendererTemplateInstancesProvider>
</template>
