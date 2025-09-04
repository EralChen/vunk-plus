import { isString } from '@vue/shared'
import { SCOPE } from 'element-plus'

export const isNumber = (val: any): val is number => typeof val === 'number'
export function isStringNumber (val: string): boolean {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

export function addUnit (value?: string | number, defaultUnit = 'px') {
  if (!value)
    return ''
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`
  }
  else if (isString(value)) {
    return value
  }
  console.warn(SCOPE, 'binding value must be a string or number')
}
