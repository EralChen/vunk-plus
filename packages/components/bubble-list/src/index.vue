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
        v-bind="$attrs"
        :ref="elRef"
        :max-height="`${height}px`"
        :list="items"
      ></BubbleList>
    </template>
  </ElAutoResizer>
</template>
