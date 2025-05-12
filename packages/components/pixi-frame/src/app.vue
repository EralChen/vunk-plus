<script lang="ts" setup>
import type { ApplicationOptions } from 'pixi.js'
import type { PropType, Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { initPixiApp } from './use'

const props = defineProps({
  appendTo: null,
  defaultOptions: {
    type: Object as PropType<Partial<ApplicationOptions>>,
    default: () => ({}),
  },
})
const app = initPixiApp()
const appRef = ref() as Ref<HTMLDivElement>
const ready = ref(false)

onMounted(async () => {
  await app.init({
    resizeTo: appRef.value,
    background: '#1099bb',
    ...props.defaultOptions,
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
