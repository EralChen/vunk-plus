import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import type { Media } from '@vunk/shared'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types'
import type { Role } from './const-roles'

export interface BubbleItem extends BubbleListItemProps {
  key?: string
  role: Role
}

export interface RoleMediaBasic extends Partial<BubbleItem>, Media {
  value: Role
}

export type Item = BubbleItem & __VkBubbleTemplates.RenderItem
export type RoleMedia = RoleMediaBasic & __VkBubbleTemplates.RenderItem
