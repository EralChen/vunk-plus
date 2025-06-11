<script lang="ts" setup>
import type { UseWebSocketReturn } from '@vueuse/core'
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import type { __VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import type { Application, Sprite } from 'pixi.js'
import type { PropType, Ref } from 'vue'
import { ParagraphStatus, VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { TickerStatus, VkPixiFrameCore } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { useDeferred } from '@vunk/core/composables'
import { waiting } from '@vunk/shared/promise'
import { computed, reactive, ref, watchEffect } from 'vue'

interface FrameDatum {
  src: string
  position: {
    x: number
    y: number
  }
  currentTime: number
}

defineOptions({
  name: 'MetahumanBroadcasting',
  inheritAttrs: false,
})

const props = defineProps({
  webSocket: {
    type: Object as PropType<UseWebSocketReturn<any>>,
    required: true,
  },
  keepRead: {
    type: Boolean,
    default: false,
  },
})

const broadcastingMarkdownDef = useDeferred<__VkBubbleTemplates.Interruptable>()

const frameStatus = ref(TickerStatus.pending)
const paragraphData = ref([]) as Ref<__VkBroadcastingMarkdown.Paragraph[]>

const frameAppDef = useDeferred<Application>()
const frameSpriteDef = useDeferred<Sprite>()

const handleLoadFrame: __VkPixiFrame.OnLoad = ({
  application,
  sprite,
}) => {
  frameAppDef.resolve(application)
  frameSpriteDef.resolve(sprite)
}

const relativeSprite = computed(() => {
  return frameAppDef.value?.stage.getChildAt(0) as Sprite | undefined
})
const relativeSpriteVideo = computed(() => {
  return relativeSprite.value?.texture?.source?.resource as HTMLVideoElement | undefined
})

const isParagraphUnplayed = computed(() => {
  return paragraphData.value.some(
    item => item.status === ParagraphStatus.pending
      && item.broadcast !== TickerStatus.playing,
  )
})

const { data, send } = props.webSocket

const frameShow = ref(true)
const frameUrls = reactive<FrameDatum[]>([])

const handleResize: __VkPixiFrame.Resize = ({
  sprite,
  application,
  meta,
}) => {
  const relativeSprite = application.stage.getChildAt(0) as Sprite

  if (relativeSprite && meta) {
    sprite.x = relativeSprite.x + (meta.position.x * relativeSprite.scale.x)
    sprite.y = relativeSprite.y + (meta.position.y * relativeSprite.scale.y)
    sprite.scale.set(
      relativeSprite.scale.x,
      relativeSprite.scale.y,
    )
  }
  const video = relativeSprite.texture?.source?.resource as HTMLVideoElement | undefined

  if (video && meta && meta.index !== 0) {
    // 设置一个 0.1秒的阈值，来决定是否校准
    if (Math.abs(video.currentTime - meta.currentTime) > 0.04) {
      if (video.seeking) {
        return
      }
      video.currentTime = meta.currentTime
    }
  }
}

watchEffect(() => {
  const json = JSON.parse(data.value)
  if (!json) {
    return
  }

  if (json.type === 'frame') { // 添加帧数据
    const url = `data:image/jpeg;base64,${json.frame_data}`
    frameUrls.push({
      src: url,
      position: {
        x: json.face_position.x_min,
        y: json.face_position.y_min,
      },
      currentTime: json.bg_frame_time,
    })
    return
  }

  if ( // 选择一个合适的时机（有足够的缓冲帧）开始播放
    (json.type === 'progress' && json.frame === 80)
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
  if (!item.url) {
    return
  }
  const message = {
    mode: 'start_from_position',
    audio_data: item.url.split(',').slice(1).join(),
  }
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
    data.broadcast = TickerStatus.play
  })
}
function paragraphCompleted (v: boolean) {
  if (v && paragraphData.value.length
    && frameStatus.value !== TickerStatus.pending
  ) {
    frameStop()
  }
}

function frameStop () {
  frameShow.value = false
  frameStatus.value = TickerStatus.stop
  frameUrls.length = 0
}

async function interrupt () {
  const broadcastingMarkdown = await broadcastingMarkdownDef.promise
  broadcastingMarkdown.interrupt?.()
  frameStop()
}
defineExpose({
  interrupt,
})
</script>

<template>
  <ElButton @click="() => console.log(paragraphData)">
    log
  </ElButton>
  <VkBroadcastingMarkdown
    v-bind="$attrs"
    :ref="broadcastingMarkdownDef.resolve"
    :keep-read="keepRead"
    :data="paragraphData"
    :processing="processingParagraph"
    :separators="[]"
    @set-data="setData(paragraphData, $event)"
    @paragraph-load="paragraphLoad"
    @update:completed="paragraphCompleted"
  >
  </VkBroadcastingMarkdown>
  <VkPixiFrameCore
    v-if="frameShow"
    v-model:status="frameStatus"
    v-model:data="frameUrls"
    :resize="handleResize"
    @load="handleLoadFrame"
    @set-data="setData(frameUrls, $event)"
  ></VkPixiFrameCore>
</template>
