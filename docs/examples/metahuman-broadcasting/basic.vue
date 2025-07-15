<script lang="ts" setup>
import { VkMetahumanBroadcasting } from '@vunk-plus/components/metahuman-broadcasting'
import { VkPixiFrameProvider } from '@vunk-plus/components/pixi-frame'

const text = `大自然里，草长莺飞，莺歌燕舞，她生活在一个美好的世界里。

然而，当她经过茧里的痛苦与挣扎，终于破茧而出时，却不是一只在空中轻盈飞舞的花蝴蝶，而是蜕变成为了一只灰色的小飞蛾。

在同伴的叹息中，她笑着流下了激动的泪水。`
</script>

<template>
  <!-- 提供播放器 -->
  <VkPixiFrameProvider>
    <!-- 传入文本 -->
    <VkMetahumanBroadcasting
      :source="text"
    ></VkMetahumanBroadcasting>
  </VkPixiFrameProvider>
</template>
