import type { UploadFile } from 'ant-design-vue'
import type { PropType } from 'vue'

export const props = {

  /**
   * @description v-model 绑定文件列表
   */
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: undefined,
  },

  /**
   * @description 文件上传地址
   */
  action: {
    type: String,
    default: '',
  },
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
  'update:fileList': (_: UploadFile[]) => true,
  'update:modelValue': (_: string) => true,
  'submit': (_: string) => true,
  'cancel': null,
}
