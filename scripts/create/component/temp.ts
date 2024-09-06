import { capitalize } from 'vue'
import { LIB_PRE } from '@lib-env/build-constants'

// vk => Vk
const pre = capitalize(LIB_PRE)

export const createIndexStr = capName => `import { App } from 'vue'
import ${pre}${capName} from './src/index.vue'
export * as __${pre}${capName} from './src/types'

${pre}${capName}.install = (app: App): void => {
  app.component(${pre}${capName}.name || '${pre}${capName}', ${pre}${capName})
}
export {
  ${pre}${capName},
}
export default ${pre}${capName}
`

export const createTypesStr = () => `
export {}
`

export const createVueStr = (capName:string) => `<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
export default defineComponent({
  name: '${pre}${capName}',
  emits,
  props,
  setup (props, { emit }) {
    return {}
  },
})
</script>
<template>
  <div>${capName}</div>
</template>
`

export const createCtxStr = () => `import { PropType } from 'vue'

export const props = {
  modelValue: {
    type: Object as PropType<unknown>,
    default: () => ({}),
  },
}

export const emits = {
}`