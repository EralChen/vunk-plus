import type { editor } from 'monaco-editor'
import type { PropType } from 'vue'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'

export const props = {
  modelValue: {
    type: String,
    default: '',
  },

  defaultOptions: {
    type: Object as PropType<editor.IStandaloneEditorConstructionOptions>,
    default: () => ({}),
  },

  readOnly: {
    type: Boolean,
    default: false,
  },

  autoHeight: {
    type: Boolean,
    default: false,
  },
}

export const createBindProps = bindPropsFactory(props)

export const emits = {
  'update:modelValue': null,
  'load': (_editor: editor.IStandaloneCodeEditor) => true,
}

export const createOnEmits = onEmitsFactory(emits)
