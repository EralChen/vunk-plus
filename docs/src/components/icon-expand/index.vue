<script lang="ts" setup>
import { Expand } from '@element-plus/icons-vue'

defineOptions({
  inheritAttrs: false,
})
defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
})
</script>
<template>
  <Transition name="slide-fade">
    <el-icon
      v-show="visible"
      v-bind="$attrs"
      :size="24"
      class="cursor-pointer"
    >
      <Expand />
    </el-icon>
  </Transition>
</template>
