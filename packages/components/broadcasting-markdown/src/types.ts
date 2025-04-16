import type { ParagraphStatus } from './const'

export interface Paragraph {
  value: string
  status: ParagraphStatus
  start: number
  end: number
  separator: string
}
