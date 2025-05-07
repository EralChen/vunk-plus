<script lang="ts" setup>
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { initPixiApp } from './use'

const app = initPixiApp()
const appRef = ref() as Ref<HTMLDivElement>
const ready = ref(false)

onMounted(async () => {
  await app.init({
    resizeTo: appRef.value,
    background: '#1099bb',
  })
  appRef.value.appendChild(app.canvas)
  ready.value = true
})
</script>

<template>
  <div ref="appRef"></div>
  <slot v-if="ready"></slot>
</template>
