import { PropType } from 'vue'
import { editor } from 'monaco-editor'
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
}

export const createBindProps = bindPropsFactory(props)



export const emits = {
  'update:modelValue': null,
}

export const createOnEmits = onEmitsFactory(emits)
