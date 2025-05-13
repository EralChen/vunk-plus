<script lang="ts">
import type { } from '@vunk/shared/enum'
import { defineComponent } from 'vue'
import CoreComp from './core.vue'
import { emits, props } from './ctx'
import ProviderComp from './provider.vue'
import ViewComp from './view.vue'

export default defineComponent({
  name: 'VkPixiFrame',
  components: {
    CoreComp,
    ProviderComp,
    ViewComp,
  },
  props,
  emits,
})
</script>

<template>
  <ProviderComp>
    <ViewComp></ViewComp>
    <CoreComp
      v-bind="$props"
      @update:status="$emit('update:status', $event)"
    ></CoreComp>
  </ProviderComp>
</template>
