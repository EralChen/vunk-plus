import type { App } from 'vue'
import VkThinking from './src/index.vue'

export * as __VkThinking from './src/types'

VkThinking.install = (app: App): void => {
  app.component(VkThinking.name || 'VkThinking', VkThinking)
}

export {
  VkThinking,
}

export default VkThinking
