import type { App } from 'vue'
import VkIndependent from './src/index.vue'

export * as __VkIndependent from './src/types'

VkIndependent.install = (app: App): void => {
  app.component(VkIndependent.name || 'VkIndependent', VkIndependent)
}
export {
  VkIndependent,
}
export default VkIndependent
