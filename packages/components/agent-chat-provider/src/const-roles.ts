import type { RoleMedia } from './types'

export enum Role {
  User = 'user',
  Assistant = 'assistant',
  Broadcasting = 'broadcasting',
}

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

]

export const roleMap = roleOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<Role, RoleMedia>)
