<script lang="ts" setup>
import type { IPlayerOptions } from 'xgplayer'
import type { Flv } from 'xgplayer-flv'
import { VkXgplayer } from '@vunk-plus/components/xgplayer'
import { IPluginOptions } from 'xgplayer'
import FlvPlugin from 'xgplayer-flv'

const options: IPlayerOptions = {
  plugins: [FlvPlugin],
  isLive: false,
  /**
   * @link https://h5player.bytedance.com/en/plugins/extension/xgplayer-flv.html#config
   */
  flv: {
    loadTimeout: 10000,
    preloadTime: 4,
    retryCount: 2,
    retryDelay: 1000,
  },
}
</script>

<template>
  <div h-500px>
    <VkXgplayer
      url="http://127.0.0.1:8080/live/test.flv"
      :default-options="options"
      :autoplay="true"
    ></VkXgplayer>
  </div>
</template>
