import type { AnyFunc } from '@vunk/shared'
import type { UploadFile } from 'ant-design-vue'
import type { PropType } from 'vue'
import type { Module } from './types'

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

  /**
   * @description 可选模块, 包含: Attachments 文件上传;
   */
  modules: {
    type: Array<Module>,
    default: () => [],
  },

  /**
   * @description 非自定义Send Button时，禁用态
   */
  sendDisabled: {
    type: Boolean,
    default: false,
  },

  /**
   * @description v-model attachments显隐 在 Attachments 模块存在时有效
   */
  attachmentsVisible: {
    type: Boolean,
    default: undefined,
  },

  /**
   * @description 自定义 Send Button
   */
  createSendButton: {
    type: Function as PropType<AnyFunc>,
    default: undefined,
  },

  /**
   * @description 自定义 Attachments Button, 在 Attachments 模块存在时有效
   */
  createAttachmentsButton: {
    type: Function as PropType<AnyFunc>,
    default: undefined,
  },

  /**
   * @description 调整文本域大小
   */
  autoSize: {
    type: Object as PropType<{
      minRows?: number
      maxRows?: number
    }>,
    default: undefined,
  },

  /**
   * @link https://antd-design-x-vue.netlify.app/component/attachments.html
   */
  attachmentsProps: {
    type: Object,
    default: () => ({}),
  },
}

export const emits = {
  'update:fileList': (_: UploadFile[]) => true,
  'update:modelValue': (_: string) => true,
  'update:headerVisible': (_: boolean) => true,
  'submit': (_: string) => true,
  'cancel': null,
}
