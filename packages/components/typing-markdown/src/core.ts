import { noop } from '@vueuse/core'
import { highlight as createHighlight } from '@vunk/shared/markdown/shiki'
import MarkdownItAsync from 'markdown-it-async'

const highlightInfo = createHighlight({
  dark: 'github-dark',
  light: 'github-light',
}, {}, {
  warn: noop,
})

export async function createMarkdownIt () {
  const [highlight] = await highlightInfo
  const md = MarkdownItAsync({
    highlight,
  })

  // 生成 token 之后，给最后一个 dom 元素添加 is-last class
  md.core.ruler.after('inline', 'add-is-last-class', (state) => {
    const tokens = state.tokens
    //  向上找到除了 nesting 为 1， 且 hidden 为 false 的 token
    let lastTagIndex = -1
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i]
      if (token.nesting === 1 && !token.hidden) {
        lastTagIndex = i
        break
      }
    }
    if (lastTagIndex !== -1) {
      tokens[lastTagIndex].attrSet('class', 'is-last')
    }
  })

  return md
}

export const markdownItPromise = createMarkdownIt()
