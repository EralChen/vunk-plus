--- 
title: RoutesMenuContent
lang: zh-CN
---

# RoutesMenuContent

根据 `vue-router` 的路由配置生成菜单


## 基础用法

:::demo 
routes-menu-content/basic/index
>>>tabs
[routes-menu-content/basic/store-permission, routes-menu-content/basic/api]
>>>
:::

## Link

:::demo 
routes-menu-content/link/index
>>>tabs
[routes-menu-content/link/link ]
>>>
:::

## RoutesMenuContent Props

|prop|type|default|description|
|-|-|-|-|
| data | RouteRecordRaw[] | [] | 渲染菜单数据源 |
| popperClass | string | 'vk-routes-menu-content-popper' | 为 popper 添加类名|
| basePath | string | - | 为路由添加基础路由 |


## RoutesMenuContent Slots
| name | arguments | description |
| - | - | - |
| item | data: RouteRecordRaw, href: string | ElMenuItem `<slot>` |
| itemTitle | data: RouteRecordRaw, href: string | ElMenuItem `<slot name="title">` |
| menuTitle | data: RouteRecordRaw, href: string | ElSubMenu `<slot name="title">` |

## Route Meta Fields

```ts
// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file, in which case you will need to add an export
// to ensure it is treated as a module
export {}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 多级中只有一个需要展示的菜单时，折叠成一个菜单，设置为 true 时不折叠
     * @default false 
     */
    alwaysShow?: boolean
  }
}
```