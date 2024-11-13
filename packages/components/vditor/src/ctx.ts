import { PropType } from 'vue'
import { DefaultOptions } from './types'
import Vditor from 'vditor'

const defaultToolbar = [
  'headings',
  'bold',
  'italic',
  'strike',
  'link',
  '|',
  'list',
  'ordered-list',
  'outdent',
  'indent',
  '|',
  'line',
  'code',
  'inline-code',
  'insert-before',
  'insert-after',
  '|',
  'table',
  '|',
  'undo',
  'redo',
  '|',
  'fullscreen',
  'outline',
  'export',
  '|',
]

export const props = {
  modelValue: {
    type: String,
    default: '',
  },
  defaultOptions: {
    type: Object as PropType<DefaultOptions>,
    default: () => ({} as DefaultOptions),
  },

  placeholder: {
    type: String,
    default: 'Crtl + Enter 发送; Enter 换行',
  },
  toolbar: {
    type: Array as PropType<string[]>,
    default: () =>  defaultToolbar,
  },


  fullscreen: {
    type: Boolean,
    default: false,
  },

}

export const emits = {
  load: (e: Vditor) => e,
  'update:modelValue': (e: string) => e,
  ctrlEnter: (e: string) => e,
  'update:fullscreen': (e: boolean) => e,
}
