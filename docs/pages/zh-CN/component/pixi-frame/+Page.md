---
title: PixiFrame
lang: zh-CN
---

# PixiFrame

PixiFrame 是一个基于 PixiJS 的多媒体播放组件，支持图片序列帧动画和视频播放。

<!-- ## Basic

:::demo
pixi-frame/basic
::: -->

## APNG

支持 APNG (Animated PNG) 格式的动画图片播放，直接使用 PIXI.js 原生的 Assets 系统加载和渲染，避免内存溢出问题。

:::demo
pixi-frame/apng
:::

<!-- ## Video

支持视频文件的播放，使用 PIXI.js 的视频纹理功能实现硬件加速渲染。

:::demo
pixi-frame/video
::: -->

## PixiFrame Props

:::props
pixi-frame/src/ctx
:::

## PixiFrame Emits

| name | arguments | description |
| ---- | --------- | ----------- |
| setData | SetDataEvent | 设置数据 |

## 组件分开使用

PixiFrame 由三个核心组件组成：`VkPixiFrameProvider`、`VkPixiFrameView` 和 `VkPixiFrameCore`。

这些组件可以分别使用，以适应不同的应用场景。

### VkPixiFrameProvider

`VkPixiFrameProvider` 是 PixiJS 应用程序的上下文提供者，它负责初始化 PixiJS 应用实例，并通过 Vue 的依赖注入机制将其提供给子组件。

### VkPixiFrameView

`VkPixiFrameView` 负责创建一个容器并将 PixiJS 的 canvas 挂载到 DOM 中。它会接收来自 `VkPixiFrameProvider` 的应用实例，并初始化渲染视图。

```vue
<script setup>
import { VkPixiFrameProvider, VkPixiFrameView } from '@vunk-plus/components/pixi-frame'
</script>

<template>
  <VkPixiFrameProvider>
    <VkPixiFrameView
      class="pixi-container"
      :default-options="{ background: 'red' }"
    />
  </VkPixiFrameProvider>
</template>

<style>
.pixi-container {
  width: 100%;
  height: 300px;
}
</style>
```

### VkPixiFrameCore

`VkPixiFrameCore` 是处理帧动画逻辑的核心组件，负责加载和播放图片序列。

这样你可以将数据逻辑和视图分开，便于处理复杂的业务

```vue
<template>
  <VkPixiFrameProvider>
    <!-- VkPixiFrameView 可以被封装到其他组件中 -->
    <VkPixiFrameView />
    <!-- VkPixiFrameCore 可以被封装到其他组件中 -->
    <VkPixiFrameCore />
  </VkPixiFrameProvider>
</template>
```

### 注意事项

1. `VkPixiFrameCore` 和 `VkPixiFrameView` 必须在 `VkPixiFrameProvider` 的上下文中使用。

2. 当使用多个 `VkPixiFrameCore` 实例时，注意控制它们的渲染。
