<script lang="ts" setup>
import type { NormalObject } from '@vunk/shared'
import type { Ref } from 'vue'
import { _VkTableColumnsElCtx, VkTableColumns } from '@vunk-plus/components/table-columns'
import { useElBreakpoints } from '@vunk-plus/composables/el-breakpoints'
import { VkDuplexCalc } from '@vunk/core'
import { ElTable as _ElTable, ElPagination } from 'element-plus'
import { computed } from 'vue'
import { createPaginationBindProps, createPaginationOnEmits, createTableBindProps, props as dProps, emits } from './ctx'
import { createElTableOnEmits } from './el-ctx'

defineOptions({
  name: 'VkTablesV1',
})
const props = defineProps(dProps)
const emit = defineEmits(emits)

const ElTable = _ElTable as never

const paginationBindProps: Ref<NormalObject> = createPaginationBindProps(props, ['layout', 'currentPage'])
const paginationOnEmits = createPaginationOnEmits(emit, [
  'update:current-page',
])
const columnsProps = _VkTableColumnsElCtx.createTableColumnBindProps(props)
const tableProps: Ref<NormalObject> = createTableBindProps(props)
const tableOnEmits = createElTableOnEmits(emit)
const { isMobile } = useElBreakpoints()
const hasPagination = computed(() => props.modules.includes('pagination'))

/* currentPage => start */
const theCurrentPage = computed({
  get: () => {
    if (props.start !== undefined) {
      return Math.floor(props.start / props.pageSize) + 1
    }
    return props.currentPage
  },
  set: (val: number) => {
    emit('update:current-page', val)
    updateStart({ currentPage: val })
  },
})

function updateStart (e: {
  currentPage?: number
  pageSize?: number
}) {
  const currentPage = e.currentPage ?? theCurrentPage.value
  const pageSize = e.pageSize ?? props.pageSize
  emit('update:start', (currentPage - 1) * pageSize)
}
/* currentPage => start end */

/* layout */
const layout = computed(() => {
  if (props.layout) {
    return props.layout
  }
  if (isMobile.value) {
    // mobile default: 'total, prev, pager, next'
    return 'total, prev, pager, next'
  }
  // pc default: 'total, sizes, prev, pager, next, jumper'
  return 'total, sizes, prev, pager, next, jumper'
})
/* layout end */
</script>

<template>
  <VkDuplexCalc
    class="vk-tables-v1"
    with-resize="one"
    gap="var(--vk-tables-v1-gap, 14px)"
    :full="duplexFull"
  >
    <template #one="{ resizeElementClientMaxHeight }">
      <ElTable
        v-bind="tableProps"
        :ref="elRef"
        :style="tableStyle"
        :max-height="
          duplexFull
            ? tableProps.maxHeight
            : resizeElementClientMaxHeight
        "
        :class-name="`vk-tables-v1-table ${tableClass}`"
        v-on="tableOnEmits"
      >
        <VkTableColumns
          v-bind="columnsProps"
          :source="columns"
        />
      </ElTable>
    </template>

    <div
      v-if="hasPagination"
      class="vk-tables-v1-pagination-x"
    >
      <ElPagination
        v-bind="paginationBindProps"
        v-model:current-page="theCurrentPage"
        :layout="layout"
        v-on="paginationOnEmits"
        @update:page-size="updateStart({ pageSize: $event })"
      />
    </div>
  </VkDuplexCalc>
</template>

<style>
.vk-tables-v1-table{
  height: 100%;
}
.vk-tables-v1-pagination-x {
  display: flex;
  justify-content: center;
}
</style>
