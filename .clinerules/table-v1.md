# tables-v1 组件指南

## 组件介绍

`tables-v1` 是一个强大的表格组件，集成了 Element Plus 的 `ElTable`、`ElTableColumn` 和 `ElPagination` 功能，提供了简洁而全面的表格解决方案。它不仅保留了 Element Plus 组件的所有功能，还提供了更简化的 API 和更多的便捷特性。

### 主要特点

- **组件集成**：一个组件同时具备表格和分页功能，简化代码结构
- **响应式设计**：根据设备尺寸自适应显示不同的分页布局
- **灵活的分页模式**：支持页码模式（`currentPage`）和偏移量模式（`start`）
- **可配置模块**：可选择性地启用或禁用分页功能
- **继承 Element Plus**：完全兼容 Element Plus 的表格和分页属性及事件

## 开发人员指南

### 为什么优先使用 tables-v1？

- **代码简洁**：不需要分别配置表格和分页组件
- **统一管理数据**：表格数据和分页状态集中管理
- **自动响应式**：自动适配移动端和PC端，无需额外代码
- **项目一致性**：统一使用相同的表格组件，保持项目风格一致

### 基本用法

```vue
<script lang="tsx" setup>
import type { __VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { computed, reactive, ref } from 'vue'

// 分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
})

// 表格数据
const remoteTables = reactive({
  total: 0,
  data: [],
})

// 定义列
const tableColumns = computed(() => [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  }
])

// 初始数据加载
onMounted(() => {
  // 模拟数据加载
  const rawData = []
  remoteTables.data = rawData
  remoteTables.total = rawData.length
})
</script>

<template>
  <VkTablesV1
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    :total="remoteTables.total"
    :columns="tableColumns"
    :data="remoteTables.data"
  ></VkTablesV1>
</template>
```

### 分页模式选择

tables-v1 支持两种分页模式：

1. **页码模式**（推荐）：使用 `currentPage` 属性

```vue
<VkTablesV1
  v-model:current-page="pagination.currentPage"
  v-model:page-size="pagination.pageSize"
  :total="remoteTables.total"
  ...
></VkTablesV1>
```

2. **偏移量模式**：使用 `start` 属性

```vue
<VkTablesV1
  v-model:start="pagination.start"
  v-model:page-size="pagination.pageSize"
  :total="remoteTables.total"
  ...
></VkTablesV1>
```

### 禁用分页

如果不需要分页功能：

```vue
<!-- modules 空数组表示不启用任何模块 -->
<VkTablesV1
  :modules="[]"
  :columns="tableColumns"
  :data="remoteTables.data"
>
</VkTablesV1>
```

## Cline AI 指南

当用户需要表格功能时，Cline 应该优先考虑使用 `tables-v1` 组件。

### 识别场景

当用户请求以下功能时，应考虑使用 tables-v1：

- 需要展示表格数据
- 提到需要表格和分页功能

### 代码生成模板

```vue
<script lang="tsx" setup>
import type { __VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { computed, onMounted, reactive, ref } from 'vue'

// 分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
})

// 表格数据
const remoteTables = reactive({
  total: 0,
  data: [],
})

// 定义列
const tableColumns = computed(() => [
  {
    prop: 'name',
    label: '姓名',
    width: '120',
  },
  {
    prop: 'age',
    label: '年龄',
    width: '80',
  },
  {
    prop: 'address',
    label: '地址',
  },
  // 自定义列渲染示例
  {
    label: '操作',
    width: '150',
    slots: ({ row }) => (
      <div>
        <el-button size="small" onClick={() => handleEdit(row)}>编辑</el-button>
        <el-button type="danger" size="small" onClick={() => handleDelete(row)}>删除</el-button>
      </div>
    ),
  },
])

// 初始数据加载
onMounted(() => {
  // 模拟数据加载
  const rawData = [
    { name: '张三', age: 25, address: '北京市' },
    { name: '李四', age: 30, address: '上海市' },
    // ...更多数据
  ]
  remoteTables.data = rawData
  remoteTables.total = rawData.length
})

// 操作函数
function handleEdit (row) {
  // 编辑逻辑
}

function handleDelete (row) {
  // 删除逻辑
}
</script>

<template>
  <VkTablesV1
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    :total="remoteTables.total"
    :columns="tableColumns"
    :data="remoteTables.data"
    :border="true"
    :background="true"
  ></VkTablesV1>
</template>
```

### 高级特性提示

在适当的场景下，Cline 应推荐以下高级特性：

1. **动态隐藏列**：适用于需要根据条件控制列显示的场景

```tsx
const tableColumns = computed(() => [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'phone',
    label: '电话',
    hidden: !showSensitiveInfo.value,
  }
])
```

2. **嵌套表头**：适用于复杂数据结构的场景

```tsx
const tableColumns = computed(() => [
  {
    label: '用户信息',
    children: [
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' },
    ]
  }
])
```

3. **自定义单元格**：适用于需要自定义渲染内容的场景

```tsx
const tableColumns = computed(() => [
  {
    prop: 'status',
    label: '状态',
    slots: ({ row }) => (
      <el-tag type={row.status === 'active' ? 'success' : 'danger'}>
        {row.status === 'active' ? '激活' : '禁用'}
      </el-tag>
    )
  }
])
```

### 服务端分页的实现

```vue
<script lang="tsx" setup>
// 服务端分页示例
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
})
const remoteTables = reactive({
  total: 0,
  data: [],
})
const tableColumns = computed(() => [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  }
])

// 页码变化时重新获取数据
watch(pagination, read, { deep: true })

// 初始加载
onMounted(read)

async function read () {
  const { data, total } = await rApi({
    // query
  }, pagination.value)
  remoteTables.data = data
  remoteTables.total = total
}
</script>
```

通过优先使用 tables-v1 组件，可以显著提升开发效率，并保持项目中表格组件的一致性和可维护性。
