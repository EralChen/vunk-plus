<script lang="ts" setup>
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { Ref } from 'vue'
import { VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { VkPixiFrameBitmap, VkPixiFrameBitmapGenerator } from '@vunk-plus/components/pixi-frame'
import { blobToAudioBuffer } from '@vunk-plus/shared/data'
import { useModelComputed } from '@vunk/core/composables'
import { setData } from '@vunk/core/shared'
import { TickerStatus } from '@vunk/shared/enum'
import { FeatureExtractor, InferenceEngine, loadDataset } from 'sophontalk-services'
import { onMounted, ref } from 'vue'
import { props as dProps, emits } from './ctx'

defineOptions({
  name: 'VkMetahumanBroadcasting',
  inheritAttrs: false,
})

const props = defineProps(dProps)
const emit = defineEmits(emits)
const paragraphData = ref([]) as Ref<__VkBroadcastingMarkdown.Paragraph[]>
const extractor = new FeatureExtractor()
const engine = new InferenceEngine({
  onFrame,
  onError (error) {
    console.error('Inference engine error:', error)
  },
  onProgress,
})
const silentFrameGenerator = engine.createSilentFrameGenerator()
const slientFrameStatus = ref(TickerStatus.pending)
const frames = ref([]) as Ref<ImageBitmap[]>

const frameStatus = useModelComputed({
  default: TickerStatus.pending,
  key: 'status',
}, props, emit)

onMounted(async () => {
  const { dataset, zipBuffer } = await loadDataset({
    jsonUrl: props.datasetUrl,
    zipUrl: props.sourceUrl,
  })
  engine.init({
    modelPath: props.modelUrl,
    dataset,
    zipBuffer,
  })
  await engine.when()
  slientFrameStatus.value = TickerStatus.play
})

async function engineRun (
  buffer: AudioBuffer,
) {
  const { dimensions, features } = await extractor.process(buffer)
  await engine.when()
  engine.run({
    audioFeatures: features,
    audioDimensions: dimensions,
    reset: false,
  })
}
async function processingParagraph (
  item: __VkBroadcastingMarkdown.Paragraph,
) {
  if (!item.blob) {
    return
  }

  try {
    const audioBuffer = await blobToAudioBuffer(item.blob)
    await engineRun(audioBuffer)
  }
  catch (error) {
    console.error('Error processing paragraph:', error)
  }
}
function allParagraphCompleted () {
  if (paragraphData.value.length) {
    frameStatus.value = TickerStatus.stop
    frames.value.length = 0
  }
}

function onProgress (processed: number, total: number) {
  if (
    total < props.playAfterCache && processed === total
    || processed === props.playAfterCache
  ) {
    frameStatus.value = TickerStatus.play
  }
}
function onFrame (frame: ImageBitmap) {
  frames.value.push(frame)
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
    @complete="allParagraphCompleted"
  >
  </VkBroadcastingMarkdown>

  <VkPixiFrameBitmap
    v-model:status="frameStatus"
    :data="frames"
    @set-data="setData(frames, $event)"
  ></VkPixiFrameBitmap>

  <VkPixiFrameBitmapGenerator
    v-model:status="slientFrameStatus"
    :generator="silentFrameGenerator"
    :visible="frameStatus !== TickerStatus.playing"
  >
  </VkPixiFrameBitmapGenerator>
</template>
