<script lang="ts" setup>
import officePreset from '@file-viewer/preset-office'
import type { __VkFileViewer } from '@vunk-plus/components/file-viewer'
import { VkFileViewer } from '@vunk-plus/components/file-viewer'
import { ref } from 'vue'

const url = ref(import.meta.env.VITE_BASE_URL + '/sample.pptx')

const options: __VkFileViewer.FileViewerOptions = {
  theme: 'light',
  toolbar: {
    position: 'bottom-right',
  },
  preset: officePreset,
  rendererMode: 'replace',
}

function handleLoadComplete () {
  console.log('load-complete')
}
</script>

<template>
  <div h-600px>
    <VkFileViewer
      :url="url"
      :options="options"
      @load-complete="handleLoadComplete"
    />
  </div>
</template>
