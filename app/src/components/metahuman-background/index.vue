<script setup lang="ts">
import type { ResizeEvent } from '@vunk-plus/components/pixi-frame/src/types'
import type { Application, Sprite } from 'pixi.js'
import { TickerStatus, VkPixiFrameApng, VkPixiFrameView } from '@vunk-plus/components/pixi-frame'
import { useModelComputed } from '@vunk/core/composables'
import { computed, type PropType, ref } from 'vue'
import { MetahumanStatus } from './const'

defineOptions({ name: 'MetahumanBackground' })

const props = defineProps({
  status: {
    type: Number as PropType<MetahumanStatus>,
    default: MetahumanStatus.SILENT,
  },

  type: {
    type: String,
    default: undefined,
  },
  modules: {
    type: Array as PropType<'PixiFrame'[]>,
    default: () => ['PixiFrame'],
  },
})

const emit = defineEmits(['update:type'])

const hasPixiFrame = computed(() => {
  return props.modules.includes('PixiFrame')
})

const typeModel = useModelComputed({
  default: 'M',
  key: 'type',
}, props, emit)

const base = import.meta.env.BASE_URL
const videoRefs = ref<HTMLVideoElement[]>([])

const videoSources = computed(() => [
  {
    status: MetahumanStatus.SILENT,
    src: `${base}metahuman/${typeModel.value}_SILENT.mp4`,
  },
  {
    status: MetahumanStatus.THINKING,
    src: `${base}metahuman/${typeModel.value}_THINKING.mp4`,
  },
  // {
  //   status: MetahumanStatus.SPEAKING,
  //   src: `${base}metahuman/${typeModel.value}_SPEAKING.mp4`,
  // },
  {
    status: MetahumanStatus.WELCOME,
    src: `${base}metahuman/${typeModel.value}_WELCOME.mp4`,
  },
])

const chipStatus = ref(TickerStatus.play)

function handleResize ({ application, sprite }: ResizeEvent) {
  const relativeSprite = application.stage.getChildByLabel('MetahumanVideo') as Sprite
  if (relativeSprite) {
    sprite.x = relativeSprite.x + relativeSprite.width / 2 - sprite.width / 2
    sprite.y = relativeSprite.y + relativeSprite.height / 2 - sprite.height / 2
    sprite.scale.set(
      relativeSprite.scale.x,
      relativeSprite.scale.y,
    )
  }
}
</script>

<template>
  <div class="metahuman-background">
    <slot></slot>
    <VkPixiFrameView
      v-if="hasPixiFrame"
      class="source is-active"
      :default-options="{
        background: '#000',
        backgroundAlpha: 0,
      }"
    >
    </VkPixiFrameView>

    <VkPixiFrameApng
      v-if="hasPixiFrame"
      v-model:status="chipStatus"
      :url="`${base}imgs/chip.png`"
      :resize="handleResize"
      :loop="true"
    ></VkPixiFrameApng>
  </div>
</template>

<style lang="scss" scoped>
.metahuman-background {
  position: relative;
  height: 100%;
  .source {
    position: absolute;
    height: 100%;
    top: -50px;
    right: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-48%);
    z-index: 0;
    opacity: 0;
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
