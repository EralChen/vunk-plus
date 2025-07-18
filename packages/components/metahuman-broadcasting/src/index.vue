<script lang="ts" setup>
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { ImageDataResponse } from '@vunk-plus/shared/audioToFrames'
import type JSZip from 'jszip'
import type { Ref } from 'vue'
import { VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { VkPixiFrameBitmap, VkPixiFrameCore } from '@vunk-plus/components/pixi-frame'
import { blobToAudioBuffer, getStremingStartData, processStreaming, StreamingInferenceService } from '@vunk-plus/shared/audioToFrames'
import { useModelComputed } from '@vunk/core/composables'
import { setData } from '@vunk/core/shared'
import { TickerStatus } from '@vunk/shared/enum'
import { onMounted, reactive, ref, shallowReactive } from 'vue'
import { props as dProps, emits } from './ctx'

defineOptions({
  name: 'VkMetahumanBroadcasting',
  inheritAttrs: false,
})

const props = defineProps(dProps)
const emit = defineEmits(emits)
const paragraphData = ref([]) as Ref<__VkBroadcastingMarkdown.Paragraph[]>

const streamingInferenceService = new StreamingInferenceService(props.modelUrl)

const frameUrls = ref<ImageBitmap[]>([])
const silentFrameUrls = shallowReactive<string[]>([]) // 预加载的静默帧
//

const frameStatus = useModelComputed({
  default: TickerStatus.pending,
  key: 'status',
}, props, emit)

const slientFrameStatus = ref(TickerStatus.pending)

onMounted(async () => {
  await streamingInferenceService.when()
  const { blendingMaskBitmap, dataset, zipBlob, zip } = await getStremingStartData({
    datasetUrl: props.datasetUrl,
    sourceUrl: props.sourceUrl,
  })

  loadAllSilentFrames(dataset, zip)

  await streamingInferenceService.startStreaming({
    blendingMaskBitmap,
    dataset,
    zipBlob,
  }, {
    onFrame (frame) {
      frameUrls.value.push(frame)
    },
    onProgress (processed, total) {
      if (total < props.playAfterCache && processed === total || processed === props.playAfterCache) {
        frameStatus.value = TickerStatus.play
      }
    },
  })
})

async function requestProcessStreaming (
  buffer: AudioBuffer,
) {
  await streamingInferenceService.when()

  try {
    await processStreaming(buffer, {
      onChunkComplete (result) {
        streamingInferenceService.addChunk(result)
      },
    })
  }
  catch (error) {
    console.error('音频处理错误:', error)
  }
}
async function processingParagraph (
  item: __VkBroadcastingMarkdown.Paragraph,
) {
  if (!item.blob) {
    return
  }

  try {
    const audioBuffer = await blobToAudioBuffer(item.blob)
    await requestProcessStreaming(audioBuffer)
  }
  catch (error) {
    console.error('Error processing paragraph:', error)
  }
}

function allParagraphCompleted (v: boolean) {
  if (v && paragraphData.value.length) {
    frameStatus.value = TickerStatus.stop
    frameUrls.value.length = 0
  }
}

const ready = ref(false)

async function loadAllSilentFrames (
  dataset: ImageDataResponse,
  zip: JSZip,
) {
  // 加载所有图片作为静默帧（默认不说话状态）
  for (const image of dataset.images) {
    const imageFile = zip.file(image.full_image)
    if (imageFile) {
      const blob = await imageFile.async('blob')
      const url = URL.createObjectURL(blob)

      silentFrameUrls.push(url)
    }

    if (slientFrameStatus.value === TickerStatus.pending) {
      slientFrameStatus.value = TickerStatus.play
    }
  }
  ready.value = true
}
</script>

<template>
  <VkBroadcastingMarkdown
    v-bind="$attrs"
    :status="frameStatus"
    :data="paragraphData"
    :text-to-speech="textToSpeech"
    :source="source"
    :processing="processingParagraph"
    @set-data="setData(paragraphData, $event)"
    @update:completed="allParagraphCompleted"
  >
  </VkBroadcastingMarkdown>

  <VkPixiFrameBitmap
    v-model:status="frameStatus"
    :data="frameUrls"
    @set-data="setData(frameUrls, $event)"
  ></VkPixiFrameBitmap>

  <VkPixiFrameCore
    v-if="ready"
    v-model:status="slientFrameStatus"
    :data="silentFrameUrls"
    :loop="true"
    :prerender="true"
    :visible="frameStatus !== TickerStatus.playing"
  ></VkPixiFrameCore>
</template>
