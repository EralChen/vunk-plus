<script lang="tsx">
import type { __VkTablesV1 } from '@vunk-plus/components/tables-v1'
import type { AnyFunc, NormalObject } from '@vunk/shared'
import type { CheckboxValueType } from 'element-plus'
import type { RadioProps } from 'naive-ui'
import { _VkTabelsV1Ctx, VkTablesV1 } from '@vunk-plus/components/tables-v1'
import { VkCheckRecordLogic, VkCheckRecordLogicProvider } from '@vunk/core'
import { noop } from '@vunk/shared/function'
import { ElCheckbox } from 'element-plus'
import { NRadio } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { emits, props } from './ctx'

type RadioThemeOverrides = NonNullable<RadioProps['themeOverrides']>

const radioThemeOverrides: RadioThemeOverrides = {
  dotColorActive: 'var(--el-color-primary)',
  boxShadowActive: 'inset 0 0 0 1px var(--el-color-primary)',
  boxShadowHover: 'inset 0 0 0 1px var(--el-color-primary)',
  boxShadowFocus: 'inset 0 0 0 1px var(--el-color-primary), 0 0 0 2px rgba(24, 160, 88, 0.2)',
}

export default defineComponent({
  name: 'VkTablesV1Checkbox',
  components: {
    VkCheckRecordLogicProvider,
    VkTablesV1,
  },
  inheritAttrs: false,
  props,
  emits,
  setup (props, { emit }) {
    const coreProps = _VkTabelsV1Ctx.createBindProps(props, [
      'columns',
      'disabled',
    ])
    const coreEmits = _VkTabelsV1Ctx.createOnEmits(emit, ['row-click'])
    const theDisabled = computed(() => props.disabled || props.readonly)

    const getCurrentPageCheckInfo = () => {
      const oidField = props.oidField
      const allCheckedId = props.modelValue.map(d => d[oidField])
      const checkedNodes = [] as any[]
      const uncheckedNodes = [] as any[]

      props.data.forEach((d) => {
        if (allCheckedId.includes(d[oidField])) {
          checkedNodes.push(d)
        }
        else {
          uncheckedNodes.push(d)
        }
      })

      return {
        checkedNodes,
        uncheckedNodes,
      }
    }

    function singleChange (row: NormalObject) {
      const current = props.modelValue[0]
      if (current && current[props.oidField] === row[props.oidField]) {
        emit('update:modelValue', [])
        return
      }
      emit('update:modelValue', [row])
    }

    function headerCheckboxChange (
      checked: CheckboxValueType,
      uncheckedNodes: NormalObject[],
    ) {
      if (checked) {
        // 把当页没勾上的都勾上
        emit('update:modelValue', [
          ...props.modelValue,
          ...uncheckedNodes,
        ])
      }
      else {
        // 把当页勾上的都去掉
        emit('update:modelValue', props.modelValue.filter((d) => {
          const id = d[props.oidField]
          return !props.data.some(d => d[props.oidField] === id)
        }))
      }
    }

    const changeEvents = {} as Record<string/* id */, AnyFunc>

    const checkboxCol: __VkTablesV1.Column = {
      prop: undefined,
      label: '',
      width: '50',
      align: 'center',
      headerAlign: 'center',

      slots: {
        default: e => (
          <VkCheckRecordLogic
            custom={true}
            name={e.row}
          >
            {{
              default: ({ toggle, isActive }) => {
                const onChange: AnyFunc = theDisabled.value
                  ? noop
                  : (
                    props.multiple ? toggle : () => singleChange(e.row)
                  )

                changeEvents[e.row[props.oidField]] = onChange

                const checkHandler = () => {
                  if (props.checkTrigger === 'check') {
                    onChange()
                  }
                }

                return props.multiple
                  ? (
                    <ElCheckbox
                      disabled={theDisabled.value}
                      modelValue={isActive}
                      onChange={checkHandler}
                    >
                    </ElCheckbox>
                  )
                  : (
                    <NRadio
                      disabled={theDisabled.value}
                      checked={isActive}
                      onUpdate:checked={checkHandler}
                      theme-overrides={radioThemeOverrides}
                    >
                    </NRadio>
                  )
              },
            }}
          </VkCheckRecordLogic>
        ),

        header: () => {
          if (!props.multiple)
            return ''
          const { checkedNodes, uncheckedNodes } = getCurrentPageCheckInfo()
          return (
            <ElCheckbox
              disabled={theDisabled.value}
              indeterminate={checkedNodes.length > 0 && checkedNodes.length < props.data.length}
              modelValue={checkedNodes.length && checkedNodes.length === props.data.length}
              onUpdate:modelValue={
                checked => headerCheckboxChange(
                  checked,
                  uncheckedNodes,
                )
              }
            >
            </ElCheckbox>
          )
        },
      },
    }

    /* triggle row-click */
    function handleRowClick (...e) {
      const [row] = e
      if (props.checkTrigger === 'rowClick') {
        const id = row[props.oidField]
        changeEvents[id]?.()
      }

      // eslint-disable-next-line vue/custom-event-name-casing
      emit('row-click', ...e)
    }
    /* endof triggle row-click */

    return {
      coreProps,
      coreEmits,
      checkboxCol,
      handleRowClick,
    }
  },
})
</script>

<template>
  <VkCheckRecordLogicProvider
    :allow-extra="true"
    :model-value="modelValue"
    :oid-field="oidField"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <VkTablesV1
      v-bind="{
        ...coreProps,
        ...$attrs,
      }"
      :columns="[
        selectionHidden ? { hidden: true } : checkboxCol,
        ...columns,
      ]"
      class="vk-tables-v1-checkbox"
      :class="{
        'is-readonly': readonly,
      }"

      :disabled="paginationDisabled"
      @row-click="handleRowClick"
      v-on="coreEmits"
    ></VkTablesV1>
  </VkCheckRecordLogicProvider>
</template>

<style>
.vk-tables-v1-checkbox.is-readonly .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
  background-color: var(--el-color-primary);

  --el-checkbox-disabled-checked-icon-color: var(--el-color-white);
}
.vk-tables-v1-checkbox.is-readonly .n-radio.n-radio--disabled .n-radio__dot--checked::before{
  background-color: var(--el-color-primary);
}
</style>
