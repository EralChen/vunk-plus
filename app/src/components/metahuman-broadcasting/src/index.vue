<script lang="ts" setup>
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { Ref } from 'vue'
import { useWebSocket } from '@vueuse/core'
import { ParagraphStatus, VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { TickerStatus, VkPixiFrameCore } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { waiting } from '@vunk/shared/promise'
import { consola } from 'consola'
import { computed, onBeforeUnmount, reactive, ref, watchEffect } from 'vue'

defineOptions({
  name: 'MetahumanBroadcasting',
  inheritAttrs: false,
})

const frameStatus = ref(TickerStatus.pending)
const paragraphData = ref([]) as Ref<__VkBroadcastingMarkdown.Paragraph[]>

const isParagraphUnplayed = computed(() => {
  return paragraphData.value.some(
    item => item.status === ParagraphStatus.pending
      && item.broadcast !== TickerStatus.playing,
  )
})

const { data, send, close } = useWebSocket('ws://localhost:8001/ws', {
  autoReconnect: true,
})

onBeforeUnmount(() => {
  close()
})

const frameUrls = reactive<string[]>([])

watchEffect(() => {
  const json = JSON.parse(data.value)
  if (!json) {
    return
  }

  if (json.type === 'frame') { // 添加帧数据
    const url = `data:image/jpeg;base64,${json.frame_data}`
    frameUrls.push(url)
    consola.info('Frame Data', json, frameUrls.length)
    return
  }

  if ( // 选择一个合适的时机（有足够的缓冲帧）开始播放
    (json.type === 'progress' && json.frame === 120)
    || json.type === 'streaming_complete'
  ) {
    if (
      frameStatus.value === TickerStatus.playing
      || frameUrls.length === 0
    ) {
      return
    }

    if ( // 帧或者段落未播放时, 重新激活播放
      frameStatus.value === TickerStatus.pending
      || frameStatus.value === TickerStatus.stopped
      || isParagraphUnplayed.value
    ) {
      frameStatus.value = TickerStatus.play
    }
  }
})

function processingParagraph (
  item: __VkBroadcastingMarkdown.Paragraph,
) {
  consola.info('Processing Paragraph', item)
  if (!item.url) {
    return
  }
  const message = {
    mode: 'start_from_position',
    audio_data: item.url.split(',').slice(1).join(),
  }
  consola.info('Processing Paragraph', message)
  send(JSON.stringify(message))
}
function paragraphLoad ({ data }: {
  data: __VkBroadcastingMarkdown.Paragraph
}) {
  if (frameStatus.value === TickerStatus.playing) {
    return
  }

  data.broadcast = TickerStatus.pause
  waiting(
    () => frameStatus.value === TickerStatus.playing,
    10,
    2000,
  ).then(() => {
    consola.info('Broadcast Play', Date.now())
    data.broadcast = TickerStatus.play
  })
}
function paragraphCompleted (v: boolean) {
  if (v && paragraphData.value.length) {
    frameStatus.value = TickerStatus.stop
    frameUrls.length = 0
  }
}
</script>

<template>
  <VkBroadcastingMarkdown
    v-bind="$attrs"
    :data="paragraphData"
    :processing="processingParagraph"
    @set-data="setData(paragraphData, $event)"
    @paragraph-load="paragraphLoad"
    @update:completed="paragraphCompleted"
  >
  </VkBroadcastingMarkdown>
  <VkPixiFrameCore
    v-model:status="frameStatus"
    :data="frameUrls"
  ></VkPixiFrameCore>
</template>
