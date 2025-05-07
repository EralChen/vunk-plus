<script lang="ts">
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
  setup (props, { emit }) {
    return {}
  },
})
</script>

<template>
  <AppView>
    <CoreView
      :data="data"
      :loop="loop"
    ></CoreView>
  </AppView>
</template>
