import { App } from 'vue'
import VkMonacoEnvironment from './src/index.vue'
export * as __VkMonacoEnvironment from './src/types'

VkMonacoEnvironment.install = (app: App): void => {
  app.component(VkMonacoEnvironment.name || 'VkMonacoEnvironment', VkMonacoEnvironment)
}
export {
  VkMonacoEnvironment,
}
export default VkMonacoEnvironment
