import { PropType } from 'vue'

export const props = {
  modelValue: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: undefined,
  },
}

export const emits = {
  'update:modelValue': (_: string) => true,
  'submit': (_: string) => true,
  'cancel': null,
}
