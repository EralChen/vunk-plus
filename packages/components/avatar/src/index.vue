<script lang="ts">
import { ElAvatar } from 'element-plus'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkAvatar',
  components: {
    ElAvatar,
  },
  props,
  emits,
})
</script>

<template>
  <ElAvatar
    :style="{
      background,
      color,
    }"
  >
    <slot></slot>
  </ElAvatar>
</template>
