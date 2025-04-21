<script lang="ts" setup>
import { VkSplitGrid } from '@vunk/core/components/split-grid'
</script>

<template>
  <VkSplitGrid grid-template-columns="0.3fr 8px 1fr">
    <template #default="{ getGutterProps }">
      <div id="layout-split-grid-sidebar" h-full overflow-hidden>
      </div>
      <div v-bind="getGutterProps('column', 1)"></div>
      <div w-full h-full overflow-hidden transform-gpu>
        <RouterView></RouterView>
      </div>
    </template>
  </VkSplitGrid>
</template>
