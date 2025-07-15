import type { TickerStatus } from '@vunk/shared/enum'
import type { PropType } from 'vue'

export const props = {
  /**
   * @description 传入文本
   */
  source: {
    type: String,
    default: '',
  },

  /**
   * @description 文本转语音的函数
   */
  textToSpeech: {
    type: Function as PropType<(text: string) => Promise<Blob>>,
    required: true as const,
  },

  /**
   * @description 模型地址
   */
  modelUrl: {
    type: String,
    required: true as const,
  },

  /**
   * @description 数据集地址
   */
  datasetUrl: {
    type: String,
    required: true as const,
  },

  /**
   * @description zip 资源包地址
   */
  sourceUrl: {
    type: String,
    required: true as const,
  },

  /**
   * @description 播报状态
   * @default TickerStatus.pending
   */
  status: {
    type: String as PropType<TickerStatus>,
    default: undefined,
  },

  /**
   * @description 缓存多少帧后开始播放
   */
  playAfterCache: {
    type: Number,
    default: 100,
  },
}

export const emits = {
  'update:status': null,
}
