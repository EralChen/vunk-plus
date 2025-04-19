import type { ReturnVoid } from '@vunk/shared'

export interface SubmitRawEvent {
  blob: Blob
  url: string
}

export type OnTextZone = (e: SubmitRawEvent) => ReturnVoid

export type SpeechToText = (blob: Blob) => Promise<string>
