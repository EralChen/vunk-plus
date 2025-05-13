import type { __VkRenderer } from '@vunk/core/components/renderer'
import type { VueComponentPropsType } from '@vunk/shared'
import type MyCustomTemplate from './MyCustomTemplate.vue'

// 定义自定义模板的类型
export interface MyCustomTemplateSource extends __VkRenderer.SourceItem, VueComponentPropsType<typeof MyCustomTemplate> {
  templateType: 'MyCustomTemplate' // 必须与 VkRendererTemplate 中的 type 属性匹配
}
