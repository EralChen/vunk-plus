import ElmentPlus from 'element-plus'
import type { OnCreateAppSync } from 'vike-vue'

import '../api/init'
import 'uno.css'

export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext 
  app.use(ElmentPlus)
}


