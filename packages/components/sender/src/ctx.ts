import { PropType } from 'vue'

export const props = {
  /**
   * @description v-model 绑定文本
   */
  modelValue: {
    type: String,
    default: '',
  },

  /**
   * @description 是否加载中，表现在发送按钮上
   */
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
