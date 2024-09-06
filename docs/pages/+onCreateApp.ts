import ElmentPlus from 'element-plus'
import { VkClientOnly } from '@vunk/core/components/client-only'
import type { OnCreateAppSync } from 'vike-vue'

import 'uno.css'
import '#/src/styles'


export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext 
  app.use(ElmentPlus)
  app.component('ClientOnly', VkClientOnly)

}

