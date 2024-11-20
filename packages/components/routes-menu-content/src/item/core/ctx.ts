import { bindPropsFactory } from '@vunk/core/shared/utils-vue'
import { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const props = {
  data: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({}),
  },

  popperClass: {
    type: String,
    default: '',
  },

  basePath: {
    type: String,
    default: '',
  },
}

export const createBindProps = bindPropsFactory(props)

export const emits = {
}