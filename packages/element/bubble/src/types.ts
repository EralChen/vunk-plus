export interface BubbleProps {
  placement?: 'start' | 'end'
  avatar?: string
  loading?: boolean
  shape?: 'round' | 'corner'
  variant?: 'filled' | 'borderless' | 'outlined' | 'shadow'
  maxWidth?: string
  avatarSize?: string
  avatarGap?: string
  avatarShape?: 'circle' | 'square'
  avatarSrcSet?: string
  avatarAlt?: string
  avatarFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  noStyle?: boolean
  content?: string

}

export interface BubbleEmits {
  (event: 'avatarError', e: Event): void
}
