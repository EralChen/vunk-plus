import type { App } from 'vue'
import VkAvatar from './src/index.vue'

export * as __VkAvatar from './src/types'

VkAvatar.install = (app: App): void => {
  app.component(VkAvatar.name || 'VkAvatar', VkAvatar)
}
export {
  VkAvatar,
}
export default VkAvatar
