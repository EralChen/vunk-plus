export type ThinkingStatus = 'start' | 'thinking' | 'end' | 'error' | 'cancel'

export interface ThinkingProps {
  /** @description 展开/收起状态（v-model） */
  modelValue?: boolean
  /** @description 思考内容文本 */
  content?: string
  /** @description 当前思考状态 */
  status?: ThinkingStatus
  /** @description 是否禁用交互 */
  disabled?: boolean
  /** @description status=end 时是否自动收起 */
  autoCollapse?: boolean
  /** @description 动画过渡时长 */
  duration?: string
  /** @description 头部触发按钮最小宽度 */
  buttonWidth?: string
  /** @description 内容区域最大高度（超过后滚动） */
  maxHeight?: string
  /** @description 组件最大宽度 */
  maxWidth?: string
  /** @description 卡片背景色 */
  backgroundColor?: string
  /** @description 正文字体颜色 */
  color?: string
  /** @description 标题文案 */
  title?: string
  /** @description 跳过按钮文案 */
  skipText?: string
  /** @description 是否显示跳过按钮 */
  showSkip?: boolean
  /** @description 卡片圆角 */
  radius?: string
  /** @description 卡片边框颜色 */
  borderColor?: string
}

export interface ThinkingEmits {
  (event: 'change', value: { value: boolean, status: ThinkingStatus }): void
  (event: 'update:modelValue', value: boolean): void
  (event: 'skip', value: { value: boolean, status: ThinkingStatus }): void
}
