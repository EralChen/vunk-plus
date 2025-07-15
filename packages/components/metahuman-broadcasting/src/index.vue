<script lang="ts" setup>
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { Ref } from 'vue'
import { blobToAudioBuffer, getStremingStartData, processStreaming, StreamingInferenceService } from '@vunk-plus/shared/audioToFrames'
import { useModelComputed } from '@vunk/core/composables'
import { setData } from '@vunk/core/shared'
import { TickerStatus } from '@vunk/shared/enum'
import { onMounted, ref } from 'vue'
import { props as dProps, emits } from './ctx'

defineOptions({
  name: 'VkMetahumanBroadcasting',
})

const props = defineProps(dProps)
const emit = defineEmits(emits)
const paragraphData = ref([]) as Ref<__VkBroadcastingMarkdown.Paragraph[]>

const streamingInferenceService = new StreamingInferenceService(props.modelUrl)

const frameUrls = ref<ImageBitmap[]>([])
// const predictiveFrameUrls = ref<ImageBitmap[]>([])

const frameStatus = useModelComputed({
  default: TickerStatus.pending,
  key: 'status',
}, props, emit)

onMounted(async () => {
  await streamingInferenceService.when()
  const { blendingMaskBitmap, dataset, zipBlob } = await getStremingStartData({
    datasetUrl: props.datasetUrl,
    sourceUrl: props.sourceUrl,
  })

  // const predictiveFrame = new PredictiveFrameLoader(dataset, zip)
  // predictiveFrame.warmup(0)
  // predictiveFrame.getFrame(1, 1, dataset.images.length)

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
</script>

<template>
  <VkBroadcastingMarkdown
    :status="status"
    :data="paragraphData"
    :text-to-speech="textToSpeech"
    :source="source"
    :processing="processingParagraph"
    @set-data="setData(paragraphData, $event)"
  >
  </VkBroadcastingMarkdown>
</template>
