<script lang="ts" setup>
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { initPixiApp } from './use'

defineProps({
  appendTo: null,
})
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
  <Teleport
    :to="appendTo"
    :disabled="!appendTo"
  >
    <div ref="appRef" class="vk-pixi-frame"></div>
  </Teleport>
  <slot v-if="ready"></slot>
</template>

<style>
.vk-pixi-frame{
  height: 100%;
  width: 100%;
}
</style>
