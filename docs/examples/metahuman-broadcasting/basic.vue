<script lang="ts" setup>
import { VkMetahumanBroadcasting, workerConfig } from '@vunk-plus/components/metahuman-broadcasting'
import { VkPixiFrameProvider, VkPixiFrameView } from '@vunk-plus/components/pixi-frame'
import { TickerStatus } from '@vunk/shared/enum'
import { ref } from 'vue'
import { textToSpeech } from './api'

workerConfig.path = `${import.meta.env.BASE_URL}sophontalk`

const modelUrl = `${import.meta.env.BASE_URL}sophontalk/model.onnx`
const sourceUrl = `${import.meta.env.BASE_URL}sophontalk/processed_images.zip`
const datasetUrl = `${import.meta.env.BASE_URL}sophontalk/complete_dataset.json`

const frameStatus = ref(TickerStatus.pending)

const text = `大自然里，草长莺飞，莺歌燕舞，她生活在一个美好的世界里。

然而，当她经过茧里的痛苦与挣扎，终于破茧而出时，却不是一只在空中轻盈飞舞的花蝴蝶，而是蜕变成为了一只灰色的小飞蛾。

在同伴的叹息中，她笑着流下了激动的泪水。`
</script>

<template>
  <p>当前状态: {{ frameStatus }}</p>
  <!-- 提供播放器 -->
  <VkPixiFrameProvider>
    <!-- 传入文本 -->
    <VkMetahumanBroadcasting
      v-model:status="frameStatus"
      :model-url="modelUrl"
      :source-url="sourceUrl"
      :dataset-url="datasetUrl"
      :source="text"
      :text-to-speech="textToSpeech"
    ></VkMetahumanBroadcasting>

    <!-- 显示视频帧 -->
    <div h-450px>
      <VkPixiFrameView
        :default-options="{
          background: '#FFF',
        }"
      ></VkPixiFrameView>
    </div>
  </VkPixiFrameProvider>
</template>
