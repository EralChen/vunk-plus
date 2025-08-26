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
    templateType: 'VkMarkdown',
  },
  {
    label: 'AI 助手',
    value: Role.Assistant,
    isMarkdown: true,
    placement: 'start',
    typing: true,
    templateType: 'VkMarkdown',
  },

]

export const roleMap = roleOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<Role, RoleMedia>)
