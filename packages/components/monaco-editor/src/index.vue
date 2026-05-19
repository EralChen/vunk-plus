<script lang="ts">
import type { Ref } from 'vue'
import { watchPausable } from '@vueuse/core'
import { editor as mEditor } from 'monaco-editor'
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkMonacoEditor',
  props,
  emits,
  setup (props, { emit }) {
    const editorNode = ref() as Ref<HTMLDivElement>
    const autoHeight = ref('')

    const editorStyle = computed(() => {
      if (!props.autoHeight || !autoHeight.value)
        return undefined

      return {
        height: autoHeight.value,
      }
    })

    onMounted(() => {
      const editor = mEditor.create(editorNode.value, props.defaultOptions)
      emit('load', editor)

      function syncAutoHeight () {
        if (!props.autoHeight)
          return

        const nextHeight = `${Math.ceil(editor.getContentHeight())}px`
        if (autoHeight.value === nextHeight)
          return

        autoHeight.value = nextHeight
        nextTick(() => {
          editor.layout()
        })
      }

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

      const contentSizeDisposable = editor.onDidContentSizeChange(syncAutoHeight)
      watchEffect(syncAutoHeight)

      watchEffect(() => {
        editor.updateOptions({
          readOnly: props.readOnly,
        })
      })

      // resize
      // editorNode 尺寸发生变化
      const resizeObserver = new ResizeObserver(() => {
        editor.layout()
      })
      resizeObserver.observe(editorNode.value)
      // 组件销毁时，销毁编辑器
      onBeforeUnmount(() => {
        contentSizeDisposable.dispose()
        resizeObserver.disconnect()
        editor.dispose()
      })
    })

    return {
      editorNode,
      editorStyle,
    }
  },
})
</script>

<template>
  <div
    ref="editorNode"
    class="vk-monaco-editor"
    :style="editorStyle"
  ></div>
</template>

<style>
.vk-monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
