<script lang="ts" setup>
import { VkMonacoEditor } from '@vunk-plus/components/monaco-editor'
import { VkMonacoEnvironment } from '@vunk-plus/components/monaco-environment'
import { ref } from 'vue'

const code = ref(`{
  key: 'value',
  key2: 'value2'
}`)

</script>
<template>
  <VkMonacoEnvironment>
    <div h-200px>
      <VkMonacoEditor
        v-model="code"
        :default-options="{
          language: 'json'
        }"
        :read-only="true"
      >
      </VkMonacoEditor>
    </div>
  </VkMonacoEnvironment>
</template>