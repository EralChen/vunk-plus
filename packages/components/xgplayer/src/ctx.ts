import type { PropType } from 'vue'
import type { IPlayerOptions } from 'xgplayer'

export const props = {

  /**
   * @link https://v2.h5player.bytedance.com/config
   */
  defaultOptions: {
    type: Object as PropType<IPlayerOptions>,
    default: () => ({}),
  },

  url: {
    type: String,
    default: '',
  },

  autoplay: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
}
