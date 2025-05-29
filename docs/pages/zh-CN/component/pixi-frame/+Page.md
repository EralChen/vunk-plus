---
title: PixiFrame
lang: zh-CN
---

# PixiFrame

PixiFrame 是一个基于 PixiJS 的多媒体播放组件，支持图片序列帧动画和视频播放。

## Basic

:::demo
pixi-frame/basic
:::

## Video

支持视频文件的播放，使用 PIXI.js 的视频纹理功能实现硬件加速渲染。

:::demo
pixi-frame/video
:::

### 视频播放功能特点

- **硬件加速**: 使用 WebGL 渲染，支持 GPU 加速
- **自适应尺寸**: 视频自动适应容器大小，保持宽高比
- **播放控制**: 支持播放、暂停、停止操作
- **循环播放**: 可配置视频循环播放
- **错误处理**: 自动处理视频加载错误和格式不支持的情况
- **资源管理**: 正确的纹理生命周期管理，避免内存泄漏

### 视频格式支持

支持浏览器原生支持的视频格式：
- **MP4** (H.264/AVC)
- **WebM** (VP8/VP9)
- **OGV** (Theora)

推荐使用 MP4 格式以获得最佳的浏览器兼容性。

### 使用方式

通过 `url` 属性指定视频文件路径即可切换到视频播放模式：

```vue
<template>
  <VkPixiFrame
    v-model:status="status"
    url="/path/to/video.mp4"
    :loop="true"
  />
</template>
```

### 性能注意事项

1. **视频尺寸**: 过大的视频文件可能影响性能，建议根据显示需求优化视频分辨率
2. **同时播放**: 避免同时播放多个视频以保证性能
3. **内存管理**: 组件会自动管理视频资源，切换视频或销毁组件时会正确释放内存

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
