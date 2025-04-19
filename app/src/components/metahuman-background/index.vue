<script setup lang="ts">
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
})

const emit = defineEmits(['update:type'])

const typeModel = useModelComputed({
  default: 'F',
  key: 'type',
}, props, emit)

const base = import.meta.env.BASE_URL
const videoRefs = ref<HTMLVideoElement[]>([])

const videoSources = computed(() => [
  {
    type: 'silent',
    status: MetahumanStatus.SILENT,
    src: `${base}metahuman/${typeModel.value}_SLT.mp4`,
  },
  {
    type: 'speaking',
    status: MetahumanStatus.SPEAKING,
    src: `${base}metahuman/${typeModel.value}_SPK.mp4`,
  },
])
</script>

<template>
  <div class="metahuman-background">
    <slot></slot>
    <video
      v-for="videoSrc in videoSources"
      :key="videoSrc.type"
      ref="videoRefs"
      class="video"
      :class="[
        `${videoSrc.type}-video`,
        { active: status === videoSrc.status },
      ]"
      :src="videoSrc.src"
      loop
      muted
      autoplay
      preload="auto"
    />
  </div>
</template>

<style lang="scss" scoped>
.metahuman-background {
  position: relative;
  height: 100%;
  .video {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-48%);
    z-index: 0;
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }
}
</style>
