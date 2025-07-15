import type { PropType } from 'vue'
import type { Resize } from './types'
import { TickerStatus } from '@vunk/shared/enum'

export const props = {

  url: {
    type: String,
    requierd: false as const,
  },

  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },

  /**
   * @description 控制动画是否循环播放
   */
  loop: {
    type: Boolean,
    default: false,
  },

  /**
   * @description v-model:status 控制动画状态
   */
  status: {
    type: String as PropType<TickerStatus>,
    default: TickerStatus.pending,
  },

  frameRate: {
    type: Number,
    default: 25,
  },

  label: {
    type: String,
    default: '',
  },

  resize: {
    type: Function as PropType<Resize>,
    default: undefined,
  },

  /**
   * @description  是否在有资源时预渲染第一帧
   */
  prerender: {
    type: Boolean,
    default: false,
  },

}

export const emits = {
  'update:status': null,
  'update:data': null,
  'setData': null,
}
