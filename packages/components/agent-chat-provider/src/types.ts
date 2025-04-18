import type { Role } from '@vunk-plus/components/bubble-list'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types'

/**
 * @description useXChat parser 解析数据
 */
export type BubbleMessage = Partial<BubbleListItemProps> & {
  role: Role
  content: string
  seviceEnd?: boolean
}

/**
 * @description   useXAgent request onSuccess 发送的数据
 */
export type AgentMessage = BubbleMessage & {
  seviceLoading?: boolean
  seviceEnd?: boolean
}
