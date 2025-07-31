import { TickerStatus } from '@vunk/shared/enum'

function markdownToPlainText (md: string) {
  return (
    md
      // 移除图片 ![alt](url)
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // 移除链接 [text](url)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // 移除 Markdown 标题符号 (#, ##, ###)
      .replace(/^#{1,6}\s+/gm, '')
      // 移除加粗 **text** 或 __text__
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      // 移除斜体 *text* 或 _text_
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      // 移除行内代码 `code`
      .replace(/`(.*?)`/g, '$1')
      // 移除代码块 ```code```
      .replace(/```[\s\S]*?```/g, '')
      // 移除多余的换行符
      .replace(/\n{2,}/g, '\n')
      // --- 移除水平线
      .replace(/-{3,}/g, '')
      // - 移除无序列表
      .replace(/^\s*-\s+/gm, '')
      // | 移除分隔线
      .replace(/\|/g, '')
      .trim()
  )
}

export function defaultRender (mdText: string) {
  return markdownToPlainText(mdText)
}

export enum ParagraphStatus {
  initial = 'initial',
  /**
   * @description 处理中, 通常用于需要对段落进行异步处理
   */
  processing = 'processing',

  /* 悬挂状态 */
  pending = 'pending',
  /* 成功 */
  fulfilled = 'fulfilled',
  /* 失败 */
  rejected = 'rejected',
}

export const Broadcast = TickerStatus
