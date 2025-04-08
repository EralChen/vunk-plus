import type { avatarProps } from 'element-plus'

export const props = {
  background: {
    default: 'transparent',
  },
  color: {
    default: 'currentColor',
  },
} as typeof avatarProps & {
  background: never
  color: never
}

export const emits = {
}
