<script lang="ts" setup>
import { ArrowDown, Female, Male } from '@element-plus/icons-vue'
import { VkAvatar } from '@vunk-plus/components/avatar'
import { VkCheckLogic, VkCheckLogicProvider } from '@vunk/core'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])

const typeOptions = [
  {
    label: '男性',
    value: 'M',
    icon: Male,
  },
  {
    label: '女性',
    value: 'F',
    icon: Female,
  },
]

const currentOption = computed(() => {
  return typeOptions.find(option => option.value === props.modelValue)
})
</script>

<template>
  <el-dropdown trigger="click" rd-md>
    <span class="el-dropdown-link">
      <div
        sk-flex="row_center"
        bg-white
        cursor-pointer
      >
        <VkAvatar :icon="currentOption?.icon"></VkAvatar>
        <span>{{ currentOption?.label }}</span>
        <VkAvatar :icon="ArrowDown"></VkAvatar>
      </div>

    </span>
    <template #dropdown>
      <VkCheckLogicProvider
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
      >
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="option in typeOptions"
            :key="option.value"
          >
            <VkCheckLogic
              :name="option.value"
              sk-flex="row_center"
              :clearable="false"
            >
              <VkAvatar :icon="option.icon"></VkAvatar>
              <span>{{ option.label }}</span>
            </VkCheckLogic>
          </el-dropdown-item>
        </el-dropdown-menu>
      </VkCheckLogicProvider>
    </template>
  </el-dropdown>
</template>
