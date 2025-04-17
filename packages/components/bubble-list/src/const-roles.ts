import type { RoleMedia } from './types'

export enum Role {
  User = 'user',
  Assistant = 'assistant',
}

export const roleOptions: RoleMedia[] = [
  {
    label: '用户',
    value: Role.User,
    isMarkdown: false,
    placement: 'end',
  },
  {
    label: 'AI 助手',
    value: Role.Assistant,
    isMarkdown: true,
    placement: 'start',
    variant: 'borderless',
    noStyle: true,
    typing: true,

  },
]

export const roleMap = roleOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<Role, RoleMedia>)
