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
  templateType?: RenderItem['templateType']
  meta?: any
  completed?: boolean
}
