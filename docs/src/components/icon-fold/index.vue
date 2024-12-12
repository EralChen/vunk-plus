<script lang="ts" setup>
import { Fold } from '@element-plus/icons-vue'

defineOptions({
  inheritAttrs: false,
})
defineEmits({
  click: null,
})
</script>
<template>
  <el-tooltip
    content="收起边栏"
    placement="right"
    :teleported="false"
    :show-after="600"
  >
    <el-icon
      :size="24"
      class="cursor-pointer"
      @click="$emit('click')"
    >
      <Fold />
    </el-icon>
  </el-tooltip>
</template>
