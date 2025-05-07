import type { PropType } from 'vue'

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
    default: false, // 默认循环
  },
}

export const emits = {
}
