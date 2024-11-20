import { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const props = {
  data: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => [],
  },
  popperClass: {
    type: String,
    default: 'vk-routes-menu-content-popper',
  },
  basePath: {
    type: String,
    default: '',
  },
}

export const emits = {
}