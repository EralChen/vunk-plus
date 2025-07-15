import type { SetDataEvent } from '@vunk/core'
import type { Deferred } from '@vunk/shared/promise'
import type { PropType } from 'vue'
import type { Paragraph, ParagraphLoadEvent, TextToSpeech } from './types'
import { TickerStatus } from '@vunk/shared/enum'
import { noop } from '@vunk/shared/function'
import { defaultRender } from './const'

export const props = {
  /**
   * @description md文本转纯文本的函数
   */
  render: {
    type: Function as PropType<(text: string) => string>,
    default: defaultRender,
  },

  /**
   *  @description 段落详情
   */
  data: {
    type: Array<Paragraph>,
    default: undefined,
  },

  /**
   * @description md 文本
   */
  source: {
    type: String,
    default: '',
  },

  /**
   *  @description 游标阅读延迟
   */
  delay: {
    type: Number,
    default: 0,
  },

  /**
   * @description 段落切割符号
   */
  separators: {
    type: Array<string>,
    default: () => ['\n\n', '\n'],
  },

  /**
   * @description 组件内会根据当前游标是否和 source 长度一致来判断，是否持续阅读, 当一致时，会关闭阅读状态。但若设置为 true，则会持续阅读, 这在动态接收数据时会有用
   */
  keepRead: {
    type: Boolean,
    default: false,
  },

  /**
   * @description 是否使用自定义语音合成
   */
  textToSpeech: {
    type: Function as PropType<TextToSpeech>,
    default: undefined,
  },

  /**
   * @description 段落处理函数
   */
  processing: {
    type: Function as PropType<
      (paragraph: Paragraph) => void
    >,
    default: noop,
  },

  status: {
    type: String as PropType<TickerStatus>,
    default: TickerStatus.pending,
  },

  paragraphMinlength: {
    type: Number,
    default: 20,
  },

}

export const emits = {
  'setData': (e: SetDataEvent) => e,
  'interrupt': null,
  'update:broadcasting': (_: boolean) => true,
  'update:completed': (_: boolean) => true,
  'update:error': (_: boolean) => true,
  'update:status': (_: TickerStatus) => true,
  'paragraphLoad': (_: ParagraphLoadEvent) => true,
}

export const paragraphProps = {
  data: {
    type: Object as PropType<Paragraph>,
    default: () => ({}),
  },
  deferred: {
    type: Object as PropType<Deferred<any>>,
    required: true as const,
  },
  render: {
    type: Function as PropType<(text: string) => string>,
    default: defaultRender,
  },
}

export const paragraphEmits = {
  setData: (e: SetDataEvent<keyof Paragraph>) => e,
  load: (_: ParagraphLoadEvent) => true,
}
