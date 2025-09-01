import type { ReturnVoid } from '@vunk/shared'
import type { TickerStatus } from '@vunk/shared/enum'
import type { Deferred } from '@vunk/shared/promise'
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
  url: string

  blob?: Blob

}

/**
 * @returns Audio URL
 */
export type TextToSpeech = (text: string) => Promise<string | Blob>

export interface ParagraphLoadEvent {
  data: Paragraph
  deferred: Deferred<any>
}

export type ParagraphOnLoad = (event: ParagraphLoadEvent) => ReturnVoid
