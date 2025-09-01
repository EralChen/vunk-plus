<script lang="ts" setup>
import {
  VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { TickerStatus } from '@vunk/shared/enum'
import { ref } from 'vue'
import { textToSpeech } from './api'

const text = `

大自然里，草长莺飞，莺歌燕舞，她生活在一个美好的世界里。

然而，当她经过茧里的痛苦与挣扎，终于破茧而出时，却不是一只在空中轻盈飞舞的花蝴蝶，而是蜕变成为了一只灰色的小飞蛾。

在同伴的叹息中，她笑着流下了激动的泪水，微笑着说：“上帝给了我生命，就是宝贵的，渺小的我也依然能够在这个美丽的世界中划上一抹绚丽的色彩，做一只用于扑火的飞蛾，又何乐而不为呢？”

没有翅膀的飞翔更接近天堂，有些美丽是不需要书写的。

`

const status = ref(TickerStatus.play)
</script>

<template>
  {{ status }}
  <ElButton @click="status = TickerStatus.stop">
    停止
  </ElButton>

  <!-- 暂停 -->
  <ElButton @click="status = TickerStatus.pause">
    暂停
  </ElButton>

  <!-- 播放 -->
  <ElButton @click="status = TickerStatus.play">
    播放
  </ElButton>

  <VkBroadcastingMarkdown
    v-model:status="status"
    :source="text"
    :text-to-speech="textToSpeech"
  >
  </VkBroadcastingMarkdown>
</template>
