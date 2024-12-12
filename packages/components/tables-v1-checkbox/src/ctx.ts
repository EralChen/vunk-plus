import type { PropType } from 'vue'
import { _VkTabelsV1Ctx } from '@vunk-plus/components/tables-v1'

export const props = {
  ..._VkTabelsV1Ctx.props,

  /**
   * @description v-model 绑定值
   * @property {Array} modelValue
   */
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => [],
  },

  /**
   * 必须保证主键唯一且生效，选择逻辑才生效
   *
   */
  oidField: {
    type: String,
    default: 'id',
  },

  /**
   * 是否禁用
   * @property
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 允许多个
   */
  multiple: {
    type: Boolean,
    default: true,
  },

  /**
   *  隐藏选择列
   */
  selectionHidden: {
    type: Boolean,
    default: false,
  },

}

export const emits = {
  ..._VkTabelsV1Ctx.emits,
  'update:modelValue': (val: any[]) => Array.isArray(val),
}
