import { bindPropsFactory } from '@vunk/core/shared/utils-vue'
import { textProps, useTooltipProps } from 'element-plus'

export const createTextBindProps = bindPropsFactory(textProps)
export const createTooltipBindProps = bindPropsFactory(useTooltipProps)

export const props = {
  ...textProps,
  ...useTooltipProps,
}

export const emits = {
}
