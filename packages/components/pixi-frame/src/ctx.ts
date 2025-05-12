import type { PropType } from 'vue'
import { TickerStatus } from '@vunk/shared/enum'

export const props = {
  data: {
    type: Array<string>,
    default: () => [],
  },

  /**
   * @description 控制动画是否循环播放
   */
  loop: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String as PropType<TickerStatus>,
    default: TickerStatus.pending,
  },

  frameRate: {
    type: Number,
    default: 24,
  },

}

export const emits = {
  'update:status': null,
  'update:data': null,
  'setData': null,
}
