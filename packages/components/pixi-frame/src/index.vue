<script lang="ts">
import type { } from '@vunk/shared/enum'
import { defineComponent } from 'vue'
import CoreComp from './core.vue'
import { emits, props } from './ctx'
import ProviderComp from './provider.vue'
import VideoComp from './video.vue'
import ViewComp from './view.vue'

export default defineComponent({
  name: 'VkPixiFrame',
  components: {
    CoreComp,
    ProviderComp,
    ViewComp,
    VideoComp,
  },
  props,
  emits,
})
</script>

<template>
  <ProviderComp>
    <ViewComp></ViewComp>
    <VideoComp
      v-if="url"
      :url="url"
      :loop="loop"
      :status="status"
      @update:status="$emit('update:status', $event)"
    ></VideoComp>
    <CoreComp
      v-else
      v-bind="$props"
      @update:status="$emit('update:status', $event)"
    ></CoreComp>
  </ProviderComp>
</template>
