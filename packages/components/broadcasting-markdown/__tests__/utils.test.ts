import { describe, expect, it } from 'vitest'
import { Broadcast, ParagraphStatus } from '../src/const'
import { resolveSeparatorParagraphActions, resolveTailParagraphAction } from '../src/utils'
import rawText from './raw.txt?raw'

describe('broadcasting-markdown utils', () => {
  it('creates append action when separator matches and segment length exceeds minlength', () => {
    const actions = resolveSeparatorParagraphActions({
      source: 'hello\n',
      currentIndex: 6,
      sortedSeparators: ['\n'],
      paragraphMinlength: 2,
    })

    expect(actions.mergeActions).toHaveLength(0)
    expect(actions.appendActions).toEqual([
      {
        start: 0,
        separator: '\n',
        end: 6,
        status: ParagraphStatus.initial,
        value: 'hello\n',
        broadcast: Broadcast.play,
      },
    ])
  })

  it('creates merge action for overlapping separators when last paragraph is initial', () => {
    const actions = resolveSeparatorParagraphActions({
      source: 'foo\n\n',
      currentIndex: 5,
      sortedSeparators: ['\n', '\n\n'],
      paragraphMinlength: 10,
      lastParagraph: {
        start: 0,
        end: 4,
        separator: '\n',
        value: 'foo\n',
        status: ParagraphStatus.initial,
        broadcast: Broadcast.play,
        url: '',
      },
    })

    expect(actions.appendActions).toHaveLength(0)
    expect(actions.mergeActions).toHaveLength(2)
    expect(actions.mergeActions.at(-1)).toEqual({
      end: 5,
      value: 'foo\n\n',
      separator: '\n\n',
    })
  })

  it('returns merge tail action when last paragraph is initial and separator is empty', () => {
    const action = resolveTailParagraphAction({
      source: 'hello world',
      currentIndex: 11,
      lastParagraph: {
        start: 0,
        end: 5,
        separator: '',
        value: 'hello',
        status: ParagraphStatus.initial,
        broadcast: Broadcast.play,
        url: '',
      },
    })

    expect(action).toEqual({
      type: 'merge',
      data: {
        end: 11,
        value: 'hello world',
        separator: '',
      },
    })
  })

  it('returns append tail action when no previous paragraph exists', () => {
    const action = resolveTailParagraphAction({
      source: 'hello',
      currentIndex: 5,
    })

    expect(action).toEqual({
      type: 'append',
      data: {
        start: 0,
        separator: '',
        end: 5,
        status: ParagraphStatus.initial,
        value: 'hello',
        broadcast: Broadcast.play,
      },
    })
  })

  it('does not append duplicated tail when content already ends with a separator paragraph', () => {
    const separatorActions = resolveSeparatorParagraphActions({
      source: rawText,
      currentIndex: rawText.length,
      sortedSeparators: ['\n'],
      paragraphMinlength: 2,
    })

    const lastParagraph = {
      ...separatorActions.appendActions[0],
      url: '',
    }

    const action = resolveTailParagraphAction({
      source: rawText,
      currentIndex: rawText.length,
      lastParagraph,
    })

    expect(separatorActions.appendActions).toHaveLength(1)
    expect(separatorActions.appendActions[0]?.value).toBe(rawText)
    expect(action).toEqual({ type: 'none' })
  })
})
