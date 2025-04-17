import type { __VkBubbleList, Role } from '@vunk-plus/components/bubble-list'

/**
 * @description useXChat parser 解析数据
 */
export interface BubbleMessage {
  role: Role
  content: string
}

/**
 * @description   useXAgent request onSuccess 发送的数据
 */
export interface AgentMessage extends BubbleMessage {

}
