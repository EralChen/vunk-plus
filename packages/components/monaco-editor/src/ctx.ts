import { PropType } from 'vue'
import { editor } from 'monaco-editor'

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
}

export const emits = {
  'update:modelValue': null,
}
