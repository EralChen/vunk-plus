import { PropType } from 'vue'

export const props = {

  disabled: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  stop: (_: Blob) => true,
  start: null,
}
