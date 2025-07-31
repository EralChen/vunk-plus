import type { App } from 'vue'
import VkBroadcastingMarkdown from './src/index.vue'

export * from './src/const'
export * as _VkBroadcastingMarkdownCtx from './src/ctx'
export * as __VkBroadcastingMarkdown from './src/types'
export { useHowlerParagraph } from './src/use'

VkBroadcastingMarkdown.install = (app: App): void => {
  app.component(VkBroadcastingMarkdown.name || 'VkBroadcastingMarkdown', VkBroadcastingMarkdown)
}
export {
  VkBroadcastingMarkdown,
}
export default VkBroadcastingMarkdown
