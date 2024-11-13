<script lang="ts" setup>
import { VkMonacoEditor } from '@vunk-plus/components/monaco-editor'
import MonacoEnvironment from './MonacoEnvironment.vue'
import { ref } from 'vue'

const code = ref(`{
  key: 'value',
  key2: 'value2'
}`)

</script>
<template>
  <MonacoEnvironment>
    <div h-300px>
      <VkMonacoEditor
        v-model="code"
        :default-options="{
          language: 'json'
        }"
        :read-only="true"
      >
      </VkMonacoEditor>
    </div>
  </MonacoEnvironment>
</template>