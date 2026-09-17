<script lang="ts" setup>
import { pdfRenderer } from '@file-viewer/renderer-pdf'
import type { __VkFileViewer } from '@vunk-plus/components/file-viewer'
import { VkFileViewer } from '@vunk-plus/components/file-viewer'
import { computed, ref } from 'vue'

const allowedExtensions = ['pdf']

const samples = [
  { label: 'PDF（放行）', url: import.meta.env.BASE_URL + 'sample.pdf' },
  { label: 'DOCX（未装配）', url: import.meta.env.BASE_URL + 'sample.docx' },
]

const current = ref(samples[0].url)
const locale = ref<'zh-CN' | 'en-US'>('zh-CN')

const currentExtension = computed(() => {
  const clean = current.value.split(/[?#]/)[0]
  const dot = clean.lastIndexOf('.')
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : ''
})

const isAllowed = computed(() => allowedExtensions.includes(currentExtension.value))

const blockedText = computed(() => locale.value === 'zh-CN'
  ? {
      title: '暂不支持在线预览',
      message: `不支持 .${currentExtension.value} 格式的在线预览，请下载后查看或转换为 PDF。`,
      description: '当前预览器仅开放 PDF 能力。',
    }
  : {
      title: 'Online preview is not supported yet',
      message: `.${currentExtension.value} cannot be previewed online. Download it or convert it to PDF.`,
      description: 'This viewer only exposes PDF capability.',
    })

const options = computed<__VkFileViewer.FileViewerOptions>(() => ({
  theme: 'light',
  locale: locale.value,
  rendererMode: 'replace',
  builtinRenderers: 'none',
  renderers: [pdfRenderer] as unknown as __VkFileViewer.FileViewerOptions['renderers'],
  autoRenderers: false,
}))
</script>

<template>
  <div>
    <div flex="~ gap-2 wrap" mb-3>
      <button
        v-for="item in samples"
        :key="item.url"
        type="button"
        :disabled="current === item.url"
        @click="current = item.url"
      >
        {{ item.label }}
      </button>

      <button type="button" @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
        切换语言（当前：{{ locale }}）
      </button>
    </div>

    <div h-600px>
      <VkFileViewer v-if="isAllowed" :key="locale" :url="current" :options="options" />

      <div v-else flex="~ col center" h-full gap-3 p-8 text-center border="1 solid gray-200" rounded>
        <strong text-lg>{{ blockedText.title }}</strong>
        <p>{{ blockedText.message }}</p>
        <p text-sm op-60>{{ blockedText.description }}</p>
      </div>
    </div>
  </div>
</template>
