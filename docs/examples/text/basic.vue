<script lang="ts" setup>
import { VkText } from '@vunk-plus/components/text'
</script>

<template>
  <VkText
    v-show="false" class="w-150px mb-2" truncated
    placement="top"
  >
    Self element set width 100px

    <template #content="{ content }">
      <span class="text-text-tertiary">
        {{ content }}
      </span>
    </template>
  </VkText>
</template>
