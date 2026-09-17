<script lang="ts" setup>
import type { FileViewerExpose, FileViewerToolbarSlotProps } from '@file-viewer/vue3'
import { FileViewer as FlyfishFileViewer } from '@file-viewer/vue3'
import { ref } from 'vue'
import { emits, props as dProps } from './ctx'

defineOptions({
  name: 'VkFileViewer',
})

const props = defineProps(dProps)
const emit = defineEmits(emits)

defineSlots<{
  'toolbar-start'?: (props: FileViewerToolbarSlotProps) => unknown
  'toolbar-end'?: (props: FileViewerToolbarSlotProps) => unknown
}>()

const viewerRef = ref<FileViewerExpose | null>(null)

const api = new Proxy({} as FileViewerExpose, {
  get (_target, key) {
    const instance = viewerRef.value as unknown as Record<string, unknown> | null
    const value = instance?.[key as string]
    return typeof value === 'function' ? value.bind(instance) : value
  },
}) as FileViewerExpose

defineExpose<FileViewerExpose>(api)
</script>

<template>
  <FlyfishFileViewer
    ref="viewerRef"
    class="vk-file-viewer"
    :file="props.file"
    :url="props.url"
    :name="props.name"
    :filename="props.filename"
    :type="props.type"
    :size="props.size"
    :options="props.options"
    @load-start="emit('load-start', $event)"
    @load-complete="emit('load-complete', $event)"
    @unload-start="emit('unload-start', $event)"
    @unload-complete="emit('unload-complete', $event)"
    @operation-before="emit('operation-before', $event)"
    @operation-cancel="emit('operation-cancel', $event)"
    @operation-availability-change="emit('operation-availability-change', $event)"
    @search-change="emit('search-change', $event)"
    @location-change="emit('location-change', $event)"
    @zoom-change="emit('zoom-change', $event)"
    @view-state-change="emit('view-state-change', $event)"
    @fit-change="emit('fit-change', $event)"
    @theme-change="emit('theme-change', $event)"
  >
    <template v-if="$slots['toolbar-start']" #toolbar-start="slotProps: FileViewerToolbarSlotProps">
      <slot name="toolbar-start" v-bind="slotProps" />
    </template>

    <template v-if="$slots['toolbar-end']" #toolbar-end="slotProps: FileViewerToolbarSlotProps">
      <slot name="toolbar-end" v-bind="slotProps" />
    </template>
  </FlyfishFileViewer>
</template>

<style>
.vk-file-viewer {
  width: 100%;
  height: 100%;
}
</style>