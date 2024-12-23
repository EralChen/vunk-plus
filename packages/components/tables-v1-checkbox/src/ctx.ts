import type { PropType } from 'vue'
import { _VkTabelsV1Ctx } from '@vunk-plus/components/tables-v1'
import { bindPropsFactory, onEmitsFactory } from '@vunk/core/shared/utils-vue'

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

  /**
   * check触发方式
   */
  checkTrigger: {
    type: String as PropType<'check' | 'rowClick'>,
    default: 'check',
  },

  /**
   * 同 TableV1 disabled， 用于控制分页组件是否禁用
   */
  paginationDisabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },

}
export const createBindProps = bindPropsFactory(props)

export const emits = {
  ..._VkTabelsV1Ctx.emits,
  'update:modelValue': (val: any[]) => Array.isArray(val),
}

export const createOnEmits = onEmitsFactory(emits)
