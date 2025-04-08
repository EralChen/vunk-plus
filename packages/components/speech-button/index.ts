import type { App } from 'vue'
import VkSpeechButton from './src/index.vue'

export * as __VkSpeechButton from './src/types'

VkSpeechButton.install = (app: App): void => {
  app.component(VkSpeechButton.name || 'VkSpeechButton', VkSpeechButton)
}
export {
  VkSpeechButton,
}
export default VkSpeechButton
