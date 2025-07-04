import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { __VkRecorderButton } from '@vunk-plus/components/recorder-button'

export type SpeechToText = __VkRecorderButton.SpeechToText

export type TextToSpeech = __VkBroadcastingMarkdown.TextToSpeech

/**
 * @description useXChat parser 解析数据
 */
export type BubbleMessage = __VkAgentChatProvider.BubbleMessage

/**
 * @description  useXAgent request onSuccess 发送的数据
 */
export type AgentMessage = __VkAgentChatProvider.AgentMessage
