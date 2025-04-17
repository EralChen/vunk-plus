import type { App } from 'vue'
import VkBubbleList from './src/index.vue'

export * from './src/const-roles'
export * as __VkBubbleList from './src/types'

VkBubbleList.install = (app: App): void => {
  app.component(VkBubbleList.name || 'VkBubbleList', VkBubbleList)
}
export {
  VkBubbleList,
}
export default VkBubbleList
