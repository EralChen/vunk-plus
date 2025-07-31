# @vunk/form 使用规则

## 为什么使用 @vunk/form

- 使用数据驱动方式渲染表单，避免重复编写模板代码
- 强大的 TypeScript 类型支持，提供完整的类型提示
- 支持动态控制表单项的显示/隐藏
- 符合 Vue 的单向数据流设计理念
- 数据与模板分离，保持数据的单一来源

## 使用规范

1. 所有新增的表单都必须使用 @vunk/form
2. 表单项配置应该独立成文件管理，便于复用
3. 必须使用 TypeScript 以获得完整的类型支持
4. 表单数据的修改必须通过 setData 事件处理
5. 避免通过 ref 直接操作表单数据

## 基本示例

```ts
// formItems.ts
import type { __VkfForm } from '@vunk/form'

const formItems: __VkfForm.FormItem[] = [
  {
    label: '用户名',
    prop: ['user', 'name'], // prop 支持数组形式，同 ElementPlus FormItem
    required: true,
    templateType: 'VkfInput'
  },
  {
    label: '角色',
    prop: 'role',
    templateType: 'VkfSelect',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '用户', value: 'user' }
    ]
  }
]
```

```vue
<script setup lang="ts">
import { setData } from '@vunk/core'
import { VkfForm } from '@vunk/form'
// ...
</script>

<template>
  <VkfForm
    :data="formData"
    :form-items="formItems"
    @set-data="setData(formData, $event)"
  />
</template>
```

## 默认支持的表单组件

@vunk/form 的内置组件都是基于 ElementPlus 组件库的封装，例如：
- VkfInput 是 ElFormItem + ElInput 的组合
- VkfSelect 是 ElFormItem + ElSelect 的组合
- 其他组件同理（Component 除外）

默认提供以下 templateType：

- `VkfInput`: 输入框
- `VkfInputNumber`: 数字输入框
- `VkfSelect`: 下拉选择器
- `VkfDatePicker`: 日期选择器
- `VkfSwitch`: 开关
- `VkfRadio`: 单选框
- `VkfCheckbox`: 复选框
- `VkfUpload`: 文件上传
- `VkfColorPicker`: 颜色选择器
- `VkfButton`: 按钮
- `VkfCascader`: 级联选择器
- `VkfInputLink`: 链接输入框
- `VkfSlider`: 滑块
- `VkfInputTag`: 标签输入框
- `Component`: 自定义组件

## 注意事项

1. 使用 :data + @set-data 来绑定表单数据
2. 表单项配置应该按照业务模块分类管理
3. 复杂的表单逻辑应该使用 TypeScript 函数而不是字符串
4. 需要预先注册自定义组件后才能在 templateType 中使用
