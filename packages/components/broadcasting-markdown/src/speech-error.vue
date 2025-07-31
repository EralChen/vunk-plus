<script lang="ts" setup>
import { CloseBold } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
</script>

<template>
  <ElIcon
    color="var(--el-color-danger)"
    size="1.5em"
    :style="{
      verticalAlign: 'text-bottom',
    }"
  >
    <CloseBold></CloseBold>
  </ElIcon>
  <span
    :style="{
      color: 'var(--el-color-danger)',
    }"
  >
    播报失败
  </span>
</template>
