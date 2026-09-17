import type { App } from 'vue'
import VkFileViewer from './src/index.vue'

export * as __VkFileViewer from './src/types'

VkFileViewer.install = (app: App): void => {
  app.component(VkFileViewer.name || 'VkFileViewer', VkFileViewer)
}

export {
  VkFileViewer,
}

export default VkFileViewer
