<script lang="ts" setup>
import type { editor } from 'monaco-editor'
import { VkMonacoEditor } from '@vunk-plus/components/monaco-editor'
import { ref } from 'vue'
import MonacoEnvironment from '../basic/MonacoEnvironment.vue'

const defaultCode = `function createMessage(name: string) {
  return \`Hello, \${name}!\`
}

console.log(createMessage('Vunk Plus'))`

const code = ref(defaultCode)

const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
  language: 'typescript',
  minimap: {
    enabled: false,
  },
  padding: {
    top: 12,
    bottom: 12,
  },
  scrollBeyondLastLine: false,
  overviewRulerLanes: 0,
  lineNumbersMinChars: 3,
  scrollbar: {
    vertical: 'hidden',
    alwaysConsumeMouseWheel: false,
  },
  wordWrap: 'on',
}

function appendLine () {
  const nextLineNumber = code.value.split('\n').length + 1
  code.value += `\nconsole.log('line ${nextLineNumber}')`
}

function resetCode () {
  code.value = defaultCode
}
</script>

<template>
  <MonacoEnvironment>
    <div flex="~ gap-2" mb-3>
      <ElButton @click="appendLine">
        新增一行
      </ElButton>
      <ElButton @click="resetCode">
        重置
      </ElButton>
    </div>

    <div class="auto-height-monaco-editor">
      <VkMonacoEditor
        v-model="code"
        auto-height
        :default-options="defaultOptions"
      ></VkMonacoEditor>
    </div>
  </MonacoEnvironment>
</template>

<style>
.auto-height-monaco-editor {
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

/* .auto-height-monaco-editor .vk-monaco-editor {
  transition: height var(--el-transition-duration) ease;
} */
</style>
