<script lang="ts" setup>
import type { __VkTablesV1 } from '@vunk-plus/components/tables-v1'
import { VkTablesV1Checkbox } from '@vunk-plus/components/tables-v1-checkbox'
import { computed, nextTick, ref } from 'vue'
/* tables */
const data = Array.from({ length: 100 }).map((_, i) => {
  return {
    name: `name-${i + 1}`,
  }
})
const currentPage = ref(1)
const pageSize = ref(10)
const theData = computed(() => {
  return data.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})
const columns: __VkTablesV1.Column[] = [
  {
    prop: 'name',
    label: '姓名',
  },
]
/* end of tales */

const multiple = ref(true)
const value = ref([])

const selectionHidden = ref(false)
const disabled = ref(false)

function toggleMultiple () {
  multiple.value = !multiple.value

  value.value = []
}
</script>

<template>
  <p>
    value | {{ value }}
  </p>

  <p>
    <ElButton @click="toggleMultiple">
      multiple : {{ multiple }}
    </ElButton>

    <ElButton @click="selectionHidden = !selectionHidden">
      selectionHidden : {{ selectionHidden }}
    </ElButton>

    <ElButton @click="disabled = !disabled">
      disabled : {{ disabled }}
    </ElButton>
  </p>

  <VkTablesV1Checkbox
    v-model="value"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    oid-field="name"
    :selection-hidden="selectionHidden"
    :columns="columns"
    :data="theData"
    :multiple="multiple"
    :total="100"
    :disabled="disabled"
    background
  ></VkTablesV1Checkbox>
</template>
