import { App } from 'vue'
import VkRecorderButton from './src/index.vue'
export * as __VkRecorderButton from './src/types'

VkRecorderButton.install = (app: App): void => {
  app.component(VkRecorderButton.name || 'VkRecorderButton', VkRecorderButton)
}
export {
  VkRecorderButton,
}
export default VkRecorderButton
