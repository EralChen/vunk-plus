# Scrollbar

一个支持移动 Bar 位置 的 [Scrollbar](https://element-plus.org/zh-CN/component/scrollbar.html)

## Basic

:::demo
scrollbar/basic
:::

## reached

:::demo
scrollbar/reached
:::

## Scrollbar Props

| prop | type | default | description |
| - | - | - | - |
| [ElScrollbar](https://element-plus.org/zh-CN/component/scrollbar#attributes)| - | - | - |
| appendTo | Teleport['to'] | - | Bar 的容器 |
| hideAfter | number | 0 | 在没有滚动操作后，多少毫秒后隐藏滚动条。设为 0 则不会自动隐藏。 |

## Scrollbar Emits

| event | payload | description |
| - | - | - |
| [ElScrollbar](https://element-plus.org/zh-CN/component/scrollbar#events) | - | - |
| contentInsufficient | {   vertical: boolean, horizontal: boolean } | 当内容不足以产生滚动时触发 |
