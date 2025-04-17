<script lang="ts" setup>
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
  <ElAutoResizer>
    <template #default="{ height }">
      <BubbleList
        :ref="elRef"
        :btn-icon-size="18"
        :max-height="`${height}px`"
        :list="items"
        v-bind="$attrs"
      ></BubbleList>
    </template>
  </ElAutoResizer>
</template>
