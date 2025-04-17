import markdownIt from 'markdown-it'

const md = markdownIt()

export function defaultRender (mdText: string) {
  const html = md.render(mdText)
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export enum ParagraphStatus {
  initial = 'initial',

  /* 准备中 */
  pending = 'pending',
  /* 成功 */
  fulfilled = 'fulfilled',
  /* 失败 */
  rejected = 'rejected',
}
