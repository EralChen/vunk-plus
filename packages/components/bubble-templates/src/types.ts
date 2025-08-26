import type { __VkRenderer } from '@vunk/core/components/renderer'
import type { AnyFunc } from '@vunk/shared'
import type MarkdownIt from 'markdown-it'

export interface MarkdownProps {
  containers: string[]
  fences: string[]
  tags: string[]
  markdownItOptions: MarkdownIt.Options
  markdownItSetup: AnyFunc
  dev: boolean
}

export interface TypewriterSource extends __VkRenderer.SourceItem {
  templateType: 'VkMarkdown'
  content?: string
}

export type RenderItem = TypewriterSource

export type RenderData = Record<string, RenderDataRecord>

export interface RenderDataRecord {
  /**
   * @description 渲染的组件
   */
  templateType?: RenderItem['templateType']

  /**
   * @description 组件暴露的元数据
   */
  meta?: any

  /**
   * @description 已经完成的
   */
  completed?: boolean
  /**
   * @description 发生错误的
   */
  error?: boolean

  /**
   * @description 组件实例
   */
  elRef?: any
}

export interface Interruptable {
  /**
   * @description 中断
   */
  interrupt?: () => void
}
