import { App } from 'vue'
import VkMonacoEditor from './src/index.vue'
export * as __VkMonacoEditor from './src/types'
export * as _VkMonacoEditorCtx from './src/ctx'

VkMonacoEditor.install = (app: App): void => {
  app.component(VkMonacoEditor.name || 'VkMonacoEditor', VkMonacoEditor)
}
export {
  VkMonacoEditor,
}
export default VkMonacoEditor
