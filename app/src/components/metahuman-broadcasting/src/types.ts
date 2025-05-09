import type { VueComponentPropsType } from '@vunk/core'
import type { __VkRenderer } from '@vunk/core/components/renderer'
import type MetahumanBroadcasting from './index.vue'

export interface MetahumanBroadcastingSource extends __VkRenderer.SourceItem, VueComponentPropsType<typeof MetahumanBroadcasting> {
  templateType: 'MetahumanBroadcasting'
}
