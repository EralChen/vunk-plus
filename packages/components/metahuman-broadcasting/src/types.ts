import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'

export type TextToSpeech = __VkBroadcastingMarkdown.TextToSpeech

export interface Paragraph extends __VkBroadcastingMarkdown.Paragraph {
  sound?: Howl
}
