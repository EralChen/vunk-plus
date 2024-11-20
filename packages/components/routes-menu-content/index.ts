import { App } from 'vue'
import VkRoutesMenuContent from './src/index.vue'
export * as __VkRoutesMenuContent from './src/types'

VkRoutesMenuContent.install = (app: App): void => {
  app.component(
    VkRoutesMenuContent.name || 'VkRoutesMenuContent', VkRoutesMenuContent,
  )
}
export {
  VkRoutesMenuContent,
}
export default VkRoutesMenuContent
