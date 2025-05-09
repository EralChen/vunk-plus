import type { MetahumanBroadcastingSource } from '@/components/metahuman-broadcasting'
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'

export enum Role {
  User = 'user',
  Assistant = 'assistant',
  Broadcasting = 'broadcasting',
  Metahuman = 'metahuman',
}

type RoleMedia = __VkAgentChatProvider.RoleMediaBasic
  & (
  __VkBubbleTemplates.RenderItem
  | MetahumanBroadcastingSource
)

export const roleOptions: RoleMedia[] = [
  {
    label: '用户',
    value: Role.User,
    isMarkdown: false,
    placement: 'end',
    templateType: 'Typewriter',
  },
  {
    label: 'AI 助手',
    value: Role.Assistant,
    isMarkdown: true,
    placement: 'start',
    typing: true,
    templateType: 'Typewriter',
  },
  {
    label: '播报',
    value: Role.Broadcasting,
    placement: 'start',
    templateType: 'VkBroadcastingMarkdown',
  },

  {
    label: '虚拟人',
    value: Role.Metahuman,
    placement: 'start',
    templateType: 'MetahumanBroadcasting',
  },
]

export const roleMap = roleOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<string, RoleMedia>)
