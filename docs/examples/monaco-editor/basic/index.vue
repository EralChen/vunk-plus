<script lang="ts" setup>
import { VkMonacoEditor } from '@vunk-plus/components/monaco-editor'
import { ref } from 'vue'
import MonacoEnvironment from './MonacoEnvironment.vue'

const code = ref(`{
  key: 'value',
  key2: 'value2'
}`)
const dialogVisible = ref(false)
</script>

<template>
  <MonacoEnvironment>
    <ElButton @click="dialogVisible = true">
      打开
    </ElButton>

    <div h-300px>
      <VkMonacoEditor
        v-model="code"
        :default-options="{
          language: 'json',
        }"
        :read-only="true"
      >
      </VkMonacoEditor>
    </div>

    <ElDialog v-model="dialogVisible">
      <div h-300px>
        <VkMonacoEditor
          v-model="code"
          :default-options="{
            language: 'json',
          }"
        >
        </VkMonacoEditor>
      </div>
    </ElDialog>
  </MonacoEnvironment>
</template>
