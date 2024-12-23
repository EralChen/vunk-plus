<script lang="ts">
import type { Ref } from 'vue'
import { watchPausable } from '@vueuse/core'
import { editor as mEditor } from 'monaco-editor'
import { defineComponent, nextTick, onMounted, ref, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkMonacoEditor',
  props,
  emits,
  setup (props, { emit }) {
    const editorNode = ref() as Ref<HTMLDivElement>
    onMounted(() => {
      const editor = mEditor.create(editorNode.value, props.defaultOptions)

      /* v-model */
      // 主动修改 props.modelValue 时，更新编辑器内容
      const subjectModelValueWatcher = watchPausable(
        () => props.modelValue,
        (v) => {
          editor.setValue(v)
        },
        {
          immediate: true,
        },
      )
      editor.onDidChangeModelContent(() => {
        subjectModelValueWatcher.pause()
        emit('update:modelValue', editor.getValue())
        nextTick(() => {
          subjectModelValueWatcher.resume()
        })
      })
      /* endof v-model */

      watchEffect(() => {
        editor.updateOptions({
          readOnly: props.readOnly,
        })
      })
    })

    return {
      editorNode,
    }
  },
})
</script>

<template>
  <div
    ref="editorNode"
    class="vk-monaco-editor"
  ></div>
</template>

<style>
.vk-monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
