import type { Media } from '@vunk/shared'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types'

import type { Role } from './const-roles'

export interface Item extends BubbleListItemProps {
  key: string
  role: Role
}

export interface RoleMedia extends Partial<Item>, Media {
  value: Role
}
