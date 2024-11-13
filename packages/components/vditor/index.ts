import { App } from 'vue'
import VkVditor from './src/index.vue'
export * as __VkVditor from './src/types'
export * as _VkVditorCtx from './src/ctx'

VkVditor.install = (app: App): void => {
  app.component(VkVditor.name || 'VkVditor', VkVditor)
}
export {
  VkVditor,
}
export default VkVditor
