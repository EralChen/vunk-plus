import { App } from 'vue'
import VkLottieAnimation from './src/index.vue'
export * as __VkLottieAnimation from './src/types'

VkLottieAnimation.install = (app: App): void => {
  app.component(VkLottieAnimation.name || 'VkLottieAnimation', VkLottieAnimation)
}
export {
  VkLottieAnimation,
}
export default VkLottieAnimation
