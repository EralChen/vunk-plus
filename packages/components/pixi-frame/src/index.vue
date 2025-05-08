<script lang="ts">
import type { } from '@vunk/shared/enum'
import { defineComponent } from 'vue'
import AppView from './app.vue'
import CoreView from './core.vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkPixiFrame',
  components: {
    AppView,
    CoreView,
  },
  props,
  emits,
  setup () {
    return {}
  },
})
</script>

<template>
  <AppView>
    <CoreView
      v-bind="$props"
      @update:status="$emit('update:status', $event)"
    ></CoreView>
  </AppView>
</template>
