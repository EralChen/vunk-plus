import MarkdownIt  from 'markdown-it'
import { highlight } from '@vunk/shared/markdown/shiki'
import { noop } from '@vueuse/core'

const highlightPromise = highlight({
  dark: 'github-dark',
  light: 'github-light',
}, {}, {
  warn: noop,
})

export const createMarkdownIt = async () => {
  const highlight = await highlightPromise
  const md = new MarkdownIt({
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

