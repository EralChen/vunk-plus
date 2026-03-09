import type { PropType } from 'vue'
import type { ThinkingStatus } from './types'

export const props = {
  /**
   * @description 展开/收起状态（v-model）
   */
  modelValue: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 思考内容文本
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description 当前思考状态
   */
  status: {
    type: String as PropType<ThinkingStatus>,
    default: 'start' as ThinkingStatus,
  },
  /**
   * @description 是否禁用交互
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description status=end 时是否自动收起
   */
  autoCollapse: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 动画过渡时长
   */
  duration: {
    type: String,
    default: '0.2s',
  },
  /**
   * @description 头部触发按钮最小宽度
   */
  buttonWidth: {
    type: String,
    default: '160px',
  },
  /**
   * @description 组件最大宽度
   */
  maxWidth: {
    type: String,
    default: '100%',
  },
  /**
   * @description 卡片背景色
   */
  backgroundColor: {
    type: String,
    default: '#fcfcfc',
  },
  /**
   * @description 正文字体颜色
   */
  color: {
    type: String,
    default: 'var(--el-color-info)',
  },
  /**
   * @description 标题文案
   */
  title: {
    type: String,
    default: '分析用户需求',
  },
  /**
   * @description 跳过按钮文案
   */
  skipText: {
    type: String,
    default: '跳过思考',
  },
  /**
   * @description 是否显示跳过按钮
   */
  showSkip: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 卡片圆角
   */
  radius: {
    type: String,
    default: '22px',
  },
  /**
   * @description 卡片边框颜色
   */
  borderColor: {
    type: String,
    default: '#e4e7ed',
  },
  /**
   * @description 内容区域最大高度（超过后滚动）
   */
  maxHeight: {
    type: String,
    default: '',
  },
}

export const emits = {
  'change': null,
  'update:modelValue': null,
  'skip': null,
}
