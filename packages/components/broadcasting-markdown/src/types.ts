import type { TickerStatus } from '@vunk/shared/enum'
import type { ParagraphStatus } from './const'

export interface Paragraph {
  value: string
  status: ParagraphStatus
  start: number
  end: number
  separator: string

  broadcast: TickerStatus

  /**
   * @description 语音合成的 url
   */
  url?: string
}

/**
 * @returns Audio URL
 */
export type TextToSpeech = (text: string) => Promise<string>
