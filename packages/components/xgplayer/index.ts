import { App } from 'vue'
import VkXgplayer from './src/index.vue'
export * as __VkXgplayer from './src/types'

VkXgplayer.install = (app: App): void => {
  app.component(VkXgplayer.name || 'VkXgplayer', VkXgplayer)
}
export {
  VkXgplayer,
}
export default VkXgplayer
