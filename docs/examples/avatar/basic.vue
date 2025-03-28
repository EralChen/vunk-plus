<script lang="ts" setup>
import { Aim } from '@element-plus/icons-vue'
import { VkAvatar } from '@vunk-plus/components/avatar'
</script>

<template>
  <div sk-flex="row_center">
    <VkAvatar
      :icon="Aim"
      size="small"
    ></VkAvatar>
    <span>Icon</span>
  </div>
</template>
