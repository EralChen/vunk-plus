import { PropType } from 'vue'

export const props = {
  recording: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  'update:recording': null,
}
