<script setup lang="ts">
import { VkPixiFrameView } from '@vunk-plus/components/pixi-frame'
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
</script>

<template>
  <div class="metahuman-background">
    <slot></slot>
    <VkPixiFrameView
      v-if="hasPixiFrame"
      class="source is-active"
    >
    </VkPixiFrameView>
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
