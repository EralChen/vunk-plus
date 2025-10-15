<script lang="ts" setup>
import { VkBubbleRenderer, VkBubbleRenderTemplates, VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import { ElAutoResizer } from 'element-plus'
import BubbleList from './core/index.vue'
import {
  props as dProps,
} from './ctx'

defineOptions({
  name: 'VkBubbleList',
  inheritAttrs: false,
})
defineProps(dProps)
</script>

<template>
  <VkBubbleRenderTemplates>
    <template #placeholder>
      <VkBubbleTemplates></VkBubbleTemplates>
    </template>

    <slot name="renderer"></slot>

    <ElAutoResizer>
      <template #default="{ height }">
        <BubbleList
          :ref="elRef"
          :btn-icon-size="18"
          :max-height="`${height}px`"
          :scrollbar-append-to="scrollbarAppendTo"
          :auto-scroll-threshold="autoScrollThreshold"
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
            <VkBubbleRenderer :source="[item]"></VkBubbleRenderer>
          </template>
        </BubbleList>
      </template>
    </ElAutoResizer>
  </VkBubbleRenderTemplates>
</template>
