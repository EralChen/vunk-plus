<script lang="ts" setup>
import { VkBubbleRenderer, VkBubbleRenderTemplates, VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import { ElAutoResizer } from 'element-plus'
import { ref, watch } from 'vue'
import BubbleList from './core/index.vue'
import {
  props as dProps,
} from './ctx'

defineOptions({
  name: 'VkBubbleList',
  inheritAttrs: false,
})
const p = defineProps(dProps)

const bubbleListRef = ref<InstanceType<typeof BubbleList>>()

// backward compat: still call elRef if parent passed it
watch(() => p.elRef, (fn) => {
  if (fn) fn(bubbleListRef.value)
}, { immediate: true })

defineExpose({
  scrollToTop: () => bubbleListRef.value?.scrollToTop(),
  scrollToBottom: () => bubbleListRef.value?.scrollToBottom(),
  scrollToBubble: (index: number) => bubbleListRef.value?.scrollToBubble(index),
})
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
          ref="bubbleListRef"
          :btn-icon-size="18"
          :max-height="`${height}px`"
          :scrollbar-append-to="scrollbarAppendTo"
          :virtual="virtual"
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
