import type { Deferred } from '@vunk/shared/promise'
import type { PropType } from 'vue'
import type { Paragraph, TextToSpeech } from './types'
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
  status: {
    type: String as PropType<TickerStatus>,
    default: TickerStatus.pending,
  },
}

export const emits = {
  'update:status': null,
  'paragraphLoad': (e: {
    data: Paragraph
    deferred: Deferred<any>
  }) => e,
}
