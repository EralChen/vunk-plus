import type { PropType } from 'vue'
import type { TextToSpeech } from './types'
import { TickerStatus } from '@vunk/shared/enum'

export const props = {
  textToSpeech: {
    type: Function as PropType<TextToSpeech>,
    required: true as const,
  },

  source: {
    type: String,
    default: '',
  },

  send: {
    type: Function as PropType<(dataUrl: string) => void>,
    required: true as const,
  },

  status: {
    type: String as PropType<TickerStatus>,
    default: TickerStatus.pending,
  },
}

export const emits = {
}
