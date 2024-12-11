<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

defineOptions({
  inheritAttrs: false,
})
defineEmits({
  click: null,
})
</script>
<template>
  <el-tooltip
    content="边栏搜索"
    :teleported="false"
    :show-after="600"
  >
    <el-icon
      :size="22"
      class="cursor-pointer"
      @click="$emit('click')"
    >
      <Search />
    </el-icon>
  </el-tooltip>
</template>
