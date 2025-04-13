<script lang="ts">
import type { NormalObject } from '@vunk/shared'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VkMonacoEnvironment',
  setup () {
    /**
     * @description for warning:
     * You must define a function MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker？
     */
    ;(globalThis as NormalObject).MonacoEnvironment = {
      getWorker (_, label) {
        if (label === 'json') {
          return new JsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new CssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new HtmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
          return new TsWorker()
        }
        return new EditorWorker()
      },
    }

    return {}
  },
})
</script>

<template>
  <slot></slot>
</template>
