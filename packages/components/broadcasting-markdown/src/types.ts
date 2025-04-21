import type { Broadcast, ParagraphStatus } from './const'

export interface Paragraph {
  value: string
  status: ParagraphStatus
  start: number
  end: number
  separator: string

  broadcast: Broadcast

  /**
   * @description 语音合成的 url
   */
  url?: string
}

/**
 * @returns Audio URL
 */
export type TextToSpeech = (text: string) => Promise<string>
