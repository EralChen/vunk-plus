import type { PropType } from 'vue'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'
import { drawerEmits, drawerProps } from 'element-plus'

export const createElDrawerBindProps = bindPropsFactory(drawerProps)
export const createElDrawerOnEmits = onEmitsFactory(drawerEmits)

export const props = {
  ...drawerProps,

  // 额外模块
  modules: {
    type: Array as PropType<'toggle'[]>,
    default: () => [],
  },

  // 相对定位的
  absolute: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
  ...drawerEmits,
}
