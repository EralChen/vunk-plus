<script lang="tsx" setup>
import { ElTable } from 'element-plus'
import { VkTableColumns, __VkTableColumns } from '@vunk-plus/components/table-columns'
import { computed, ref } from 'vue'
import { sleep } from '@vunk/shared/promise'
const children = ref<__VkTableColumns.Source[]>([])
const colsSource = computed< __VkTableColumns.Source[]>(() => [
  {
    prop: 'date',
    label: '日期',
  },
  {
    label: '个人信息',
    children: children.value,

  },
  {
    label: 'xxx',
    prop: 'xxx',
    fixed: '',
  },
  
]) 

const data = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])

const setColChildren = async () => {
  await sleep(1000)
  children.value = children.value.length ? [] : [
    {
      prop: 'name',
      label: '名称',
      width: '200px',
    },
    {
      label: '其他',
      children: [],
    },
  ]
}
setColChildren()
</script>
<template>
  <p>
    <ElButton @click="setColChildren">
      setColChildren
    </ElButton>
  </p>


  <ElTable :data="data">
    <VkTableColumns
      :align="'center'"
      :source="colsSource"
    ></VkTableColumns>
  </ElTable>
</template>