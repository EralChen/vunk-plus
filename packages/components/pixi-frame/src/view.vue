<script lang="ts" setup>
import type { ApplicationOptions } from 'pixi.js'
import type { PropType, Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { usePixiApp } from './use'

const props = defineProps({
  defaultOptions: {
    type: Object as PropType<Partial<ApplicationOptions>>,
    default: () => ({}),
  },
})
const { application: app, context } = usePixiApp()
const appRef = ref() as Ref<HTMLDivElement>

onMounted(async () => {
  await app.init({
    resizeTo: appRef.value,
    ...props.defaultOptions,
  })
  context.whenDef.resolve(app)
  appRef.value.appendChild(app.canvas)
})
</script>

<template>
  <div ref="appRef" class="vk-pixi-frame"></div>
</template>

<style>
.vk-pixi-frame{
  height: 100%;
  width: 100%;
}
</style>
