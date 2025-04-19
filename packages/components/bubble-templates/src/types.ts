import type { VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { __VkRenderer } from '@vunk/core/components/renderer'

import type { VueComponentPropsType } from '@vunk/shared'
import type { TypewriterProps } from 'vue-element-plus-x/types/components/Typewriter/types'

export interface TypewriterSource extends __VkRenderer.SourceItem, TypewriterProps {
  templateType: 'Typewriter'
}

export interface BroadcastingMarkdownSource extends __VkRenderer.SourceItem, VueComponentPropsType<typeof VkBroadcastingMarkdown> {
  templateType: 'VkBroadcastingMarkdown'
}

export type RenderItem = TypewriterSource | BroadcastingMarkdownSource

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

}
