--- 
title: TableColumns 表格维度
lang: zh-CN
---

# TableColumns 表格维度

TableColumns 表格维度


## 基础用法

:::demo 
table-columns/basic
:::

## Hidden

:::demo 
table-columns/hidden
:::

## TableColumns Props

|prop|type|default|description|
|-|-|-|-|
|[ElTableColumn](https://element-plus.gitee.io/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)| - | - |见 ElTableColumn 可用 props|
|source*| __Source[] | - | 渲染数据源 |

```ts
export interface Source<T extends NormalObject = NormalObject>
  extends VueComponentPropsType<typeof ElTableColumn> {
  prop?: Keyof<T>,
  slots?: DefaultSlot<T> | {
    default?: DefaultSlot<T>,
    header?: Func<{ column: TableColumnCtx<T>, $index: number }>
  }
  children?: Source<T>[]
  hidden?: boolean
}

```
