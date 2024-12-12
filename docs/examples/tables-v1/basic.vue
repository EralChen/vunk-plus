<script lang="ts" setup>
import { VkTablesV1, __VkTablesV1 } from '@vunk-plus/components/tables-v1'
import { computed, ref } from 'vue';

const data = Array.from({ length: 100 }).map((_, i) => {
  return {
    name: `name-${i+1}`,
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
</script>
<template>
  <VkTablesV1
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="100"
    :columns="columns"
    :data="theData"
    :background="true"
  ></VkTablesV1>
</template>