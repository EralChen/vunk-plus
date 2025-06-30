import type { App } from 'vue'
import VkText from './src/index.vue'

export * as __VkText from './src/types'

VkText.install = (app: App): void => {
  app.component(VkText.name || 'VkText', VkText)
}
export {
  VkText,
}
export default VkText
