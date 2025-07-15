import { App } from 'vue'
import VkMetahumanBroadcasting from './src/index.vue'
export * as __VkMetahumanBroadcasting from './src/types'

VkMetahumanBroadcasting.install = (app: App): void => {
  app.component(VkMetahumanBroadcasting.name || 'VkMetahumanBroadcasting', VkMetahumanBroadcasting)
}
export {
  VkMetahumanBroadcasting,
}
export default VkMetahumanBroadcasting
