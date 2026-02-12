import type { Paragraph } from './types'
import { Broadcast, ParagraphStatus } from './const'

interface SeparatorActionOptions {
  source: string
  currentIndex: number
  sortedSeparators: string[]
  paragraphMinlength: number
  lastParagraph?: Paragraph
}

interface TailActionOptions {
  source: string
  currentIndex: number
  lastParagraph?: Paragraph
}

export interface ParagraphSeparatorActions {
  mergeActions: Array<Pick<Paragraph, 'end' | 'value' | 'separator'>>
  appendActions: Array<
    Pick<Paragraph, 'start' | 'separator' | 'end' | 'status' | 'value' | 'broadcast'>
  >
}

export type TailParagraphAction
  = | { type: 'none' }
    | {
      type: 'merge'
      data: Pick<Paragraph, 'end' | 'value' | 'separator'>
    }
    | {
      type: 'append'
      data: Pick<Paragraph, 'start' | 'separator' | 'end' | 'status' | 'value' | 'broadcast'>
    }

export function resolveSeparatorParagraphActions (
  options: SeparatorActionOptions,
): ParagraphSeparatorActions {
  const {
    source,
    currentIndex,
    sortedSeparators,
    paragraphMinlength,
    lastParagraph,
  } = options

  const mergeActions: ParagraphSeparatorActions['mergeActions'] = []
  const appendActions: ParagraphSeparatorActions['appendActions'] = []

  for (const separator of sortedSeparators) {
    const separatorLen = separator.length
    const compareText = source.slice(
      currentIndex - separatorLen,
      currentIndex,
    )

    if (compareText !== separator) {
      continue
    }

    const start = lastParagraph?.end ?? 0
    const end = currentIndex
    const value = source.slice(start, end)

    if (lastParagraph && separator.length >= value.length) {
      if (lastParagraph.status === ParagraphStatus.initial) {
        mergeActions.push({
          end,
          value: source.slice(lastParagraph.start, end),
          separator,
        })
      }
      continue
    }

    if (value.length > paragraphMinlength) {
      appendActions.push({
        start,
        separator,
        end,
        status: ParagraphStatus.initial,
        value,
        broadcast: Broadcast.play,
      })
    }
  }

  return {
    mergeActions,
    appendActions,
  }
}

export function resolveTailParagraphAction (
  options: TailActionOptions,
): TailParagraphAction {
  const { source, currentIndex, lastParagraph } = options

  if (lastParagraph?.end === currentIndex) {
    return { type: 'none' }
  }

  const start = lastParagraph?.end ?? 0
  const end = currentIndex

  if (
    lastParagraph
    && lastParagraph.status === ParagraphStatus.initial
    && lastParagraph.separator === ''
  ) {
    return {
      type: 'merge',
      data: {
        end,
        value: source.slice(lastParagraph.start, end),
        separator: '',
      },
    }
  }

  return {
    type: 'append',
    data: {
      start,
      separator: '',
      end,
      status: ParagraphStatus.initial,
      value: source.slice(start, end),
      broadcast: Broadcast.play,
    },
  }
}
