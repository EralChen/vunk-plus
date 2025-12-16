import type { OnCreateAppSync } from 'vike-vue/types'
import { VkClientOnly } from '@vunk/core/components/client-only'
import ElmentPlus, { ID_INJECTION_KEY } from 'element-plus'
import { env as ortEnt } from 'onnxruntime-web'
import { env } from 'sophontalk-services'

import 'uno.css'
import '#/src/styles'
import '#/api/init'

ortEnt.wasm.wasmPaths = `${import.meta.env.VITE_BASE_URL}/sophontalk/`
env.workersPath = `${import.meta.env.VITE_BASE_URL}/sophontalk`
env.jsonUrl = `${import.meta.env.VITE_BASE_URL}/sophontalk/complete_dataset.json`
env.zipUrl = `${import.meta.env.VITE_BASE_URL}/sophontalk/processed_images.zip`

export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext
  app.use(ElmentPlus)
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })
  app.component('ClientOnly', VkClientOnly)
}
