---
title: FileViewer
lang: zh-CN
---

# FileViewer

基于 `@file-viewer/vue3` 的文件预览组件, 支持 PDF、Word、Excel、PPT、图片、音视频等格式预览。

## 引入样式

组件不内置样式，需要在应用入口手动引入一次 `@file-viewer/vue3` 的样式文件：

```ts
// main.ts
import '@file-viewer/vue3/dist/file-viewer3.css'
```

## Basic

::::demo
file-viewer/basic
::::

## PPT

::::demo
file-viewer/ppt
::::

## 用法

预览器本身只依赖 `@file-viewer/core`，PDF、Word、PPT 等重型格式通过 preset / renderer 按需装配。完整接入分三步。

### 1. 安装 preset

```bash
pnpm i @file-viewer/preset-office
```

`preset-office` 覆盖 PDF、Word、Excel、PowerPoint、OFD 等办公文档链路；只需要少数格式时，也可以安装单个 `@file-viewer/renderer-pdf` 之类的包。

### 2. 组件里注入能力

通过 `options.preset` 把 preset 交给预览器，`rendererMode: 'replace'` 表示用传入的 renderer 替换默认集合：

```vue
<script lang="ts" setup>
import officePreset from '@file-viewer/preset-office'
import { VkFileViewer } from '@vunk-plus/components/file-viewer'

const options = {
  preset: officePreset,
  rendererMode: 'replace',
}
</script>

<template>
  <VkFileViewer url="/sample.pdf" :options="options" />
</template>
```

也可以改用 `options.renderers` 传数组，手动组合单个 renderer；多个 preset 组合时同样传数组即可。

### 3. 配置 Vite 插件

Worker、WASM、字体等资源不会随 JS 自动打包，需要插件在构建时把它们复制到产物目录：

```ts
// vite.config.ts
import { fileViewerRenderers } from '@file-viewer/vite-plugin'

export default {
  plugins: [
    fileViewerRenderers({
      copyAssets: true,
    }),
  ],
}
```

`copyAssets: true` 会按已安装的 asset owner 复制 PDF/CAD/Typst/Archive/Data 等 Worker 与 WASM 资源，满足离线和企业内网部署。插件会免配置自动发现已安装的 preset；需要更细粒度控制时可追加 `scan`、`formats`、`chunkStrategy` 等选项。

> 非 Vite 项目（Webpack、Rspack、Rollup 等）跳过插件，直接走 `options.preset` / `options.renderers` 注入，并运行 `file-viewer install --yes` 复制资源。

## 只放行 PDF

预览器没有运行期的「格式白名单」参数，格式管控靠**装配哪些 renderer** 实现——装了什么就放行什么。下面的配置只装配 PDF renderer，其余格式一律进入「不支持」状态。

下面的用例可以切换 PDF / DOCX 两种文件，并实时切换语言，观察放行与拦截的差异：

::::demo
file-viewer/pdf-only
::::

### 1. 只安装 PDF renderer

不装 preset，只装单个 renderer，包体最小：

```bash
pnpm i @file-viewer/renderer-pdf
```

### 2. 清空注册表并只注入 PDF

关键是 `rendererMode: 'replace'` 配 `builtinRenderers: 'none'`：前者丢弃内置基线，后者确保不从任何默认集合里带回其他格式，最终注册表里只剩 `pdfRenderer`。

```vue
<script lang="ts" setup>
import { pdfRenderer } from '@file-viewer/renderer-pdf'
import { VkFileViewer } from '@vunk-plus/components/file-viewer'
import { ref } from 'vue'

const url = ref('/sample.pdf')

const options = {
  theme: 'light',
  locale: 'zh-CN',
  rendererMode: 'replace',
  builtinRenderers: 'none',
  renderers: [pdfRenderer],
  autoRenderers: false,
  pdf: {
    assetBaseUrl: '/file-viewer/pdf',
  },
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
```

### 3. 构建时只复制 PDF 资源

`formats: ['pdf']` 把插件的 renderer 选择收窄到 PDF 一行，`copyAssets` 便只为这一行复制 Worker / WASM / 字体，避免无关资源进入产物。插件的 `autoPresets` 默认只在未显式配置 `preset` / `formats` / `renderers` 时才自动发现已安装 preset，这里显式写 `false` 是为了锁死行为，避免后续新增依赖时被意外带回其他格式：

```ts
// vite.config.ts
import { fileViewerRenderers } from '@file-viewer/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    fileViewerRenderers({
      formats: ['pdf'],
      autoPresets: false,
      copyAssets: true,
    }),
  ],
})
```

### 行为说明

预览器对「无法预览」分两种语义，判定依据是扩展名**是否在全局支持矩阵中**，与当前项目装了什么 renderer 无关：

| 场景 | 默认提示 | 说明 |
| --- | --- | --- |
| 打开 `.pdf` | 正常预览 | 已装配 `pdfRenderer` |
| 打开 `.docx` / `.pptx` 等**矩阵内**但未装配的格式 | 需要装配预览能力，推荐安装 … preset | 视为**配置缺口**，引导开发者补装能力 |
| 打开矩阵外的扩展名 | 暂不支持在线预览 | 视为**能力缺失** |

### 统一提示为「不支持」

面向终端用户时，「请安装 renderer」这类开发者提示并不合适——用户没有能力也不应该去装 npm 包。

> **为什么不用 `messages` 覆写？** Vue3 组件在「无匹配 renderer」时走的是包的内部兜底渲染，该兜底只接收扩展名、丢弃了 `options`，因此 `messages` / `locale` 在这条路径上不会生效。可靠做法是在应用层先判断扩展名，不在白名单就不挂载预览器。

```vue
<script lang="ts" setup>
import { pdfRenderer } from '@file-viewer/renderer-pdf'
import { VkFileViewer } from '@vunk-plus/components/file-viewer'
import { computed, ref } from 'vue'

const allowedExtensions = ['pdf']
const url = ref('/sample.docx')
const locale = ref<'zh-CN' | 'en-US'>('zh-CN')

const currentExtension = computed(() => {
  const clean = url.value.split(/[?#]/)[0]
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

const options = computed(() => ({
  locale: locale.value,
  rendererMode: 'replace',
  builtinRenderers: 'none',
  renderers: [pdfRenderer],
  autoRenderers: false,
}))
</script>

<template>
  <VkFileViewer v-if="isAllowed" :url="url" :options="options" />

  <div v-else>
    <strong>{{ blockedText.title }}</strong>
    <p>{{ blockedText.message }}</p>
    <p>{{ blockedText.description }}</p>
  </div>
</template>
```

这样提示文案与语言切换完全由业务层掌控，`allowedExtensions` 就是运行期的格式白名单。

关于国际化：

- 内置四种语言 `zh-CN` / `en-US` / `ja-JP` / `de-DE`，默认 `zh-CN`，回退 `en-US`
- `locale: 'auto'` 跟随浏览器语言，匹配不到则落 `en-US`
- 也可以把两者合并写成 `i18n: { locale, messages }`
- 渲染器内部文案（如 PDF 的页面导航、目录、第 N 页）是在**渲染时**解析并写入 DOM 的，组件不会监听 `locale` 变化。运行时切换语言需要重新挂载组件，给 `:key` 绑定 `locale` 即可：

```vue
<VkFileViewer :key="locale" :url="url" :options="options" />
```

需要排查实际放行了哪些格式时，可以通过 `onDiagnostic` 接收路由与降级诊断：

```ts
const options = {
  rendererMode: 'replace',
  builtinRenderers: 'none',
  renderers: [pdfRenderer],
  onDiagnostic: diagnostic => console.warn(diagnostic.code, diagnostic.message),
}
```

> 追加格式时不用改这段结构，往 `renderers` 数组里加即可，例如 `renderers: [pdfRenderer, wordRenderer]`。

## FileViewer Props

::::props
file-viewer/src/ctx
::::

## FileViewer Emits

| name | arguments | description |
| ---- | --------- | ----------- |
| load-start | FileViewerLifecycleContext | 开始加载 |
| load-complete | FileViewerLifecycleContext | 加载完成 |
| unload-start | FileViewerLifecycleContext | 开始卸载 |
| unload-complete | FileViewerLifecycleContext | 卸载完成 |
| operation-before | FileViewerOperationContext | 操作前 |
| operation-cancel | FileViewerOperationContext | 操作取消 |
| operation-availability-change | FileViewerOperationAvailability | 操作可用性变化 |
| search-change | FileViewerSearchState | 搜索状态变化 |
| location-change | FileViewerDocumentAnchor \| null | 定位变化 |
| zoom-change | FileViewerZoomState | 缩放变化 |
| view-state-change | FileViewerViewStateChange | 视图状态变化 |
| fit-change | ViewerFitResult | 自适应变化 |
| theme-change | light \| dark | 主题变化 |