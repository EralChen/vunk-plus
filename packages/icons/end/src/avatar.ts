import { VkAvatar } from '@vunk-plus/components/avatar'
import { h } from 'vue'
import Icon from './icon'

const Avatar = function (props) {
  return h(VkAvatar, {
    icon: Icon,
    shape: 'square',
    size: 'small',
    ...props,
  })
}

export default Avatar as unknown as typeof VkAvatar
