<script lang="ts">
import type { } from '@vunk/shared/enum'
import { computed, defineComponent } from 'vue'
import ApngComp from './apng.vue'
import CoreComp from './core.vue'
import { emits, props } from './ctx'
import ProviderComp from './provider.vue'
import VideoComp from './video.vue'
import ViewComp from './view.vue'

export default defineComponent({
  name: 'VkPixiFrame',
  components: {
    ApngComp,
    CoreComp,
    ProviderComp,
    ViewComp,
    VideoComp,
  },
  props,
  emits,
  setup (props) {
    // 检测是否为APNG文件
    const isApng = computed(() => {
      if (!props.url)
        return false
      const url = props.url.toLowerCase()
      return url.includes('.png') && !url.includes('.mp4') && !url.includes('.webm')
    })

    // 检测是否为视频文件
    const isVideo = computed(() => {
      if (!props.url)
        return false
      const url = props.url.toLowerCase()
      return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov')
    })

    return {
      isApng,
      isVideo,
    }
  },
})
</script>

<template>
  <ProviderComp>
    <ViewComp></ViewComp>
    <ApngComp
      v-if="isApng && url"
      :url="url"
      :loop="loop"
      :status="status"
      @update:status="$emit('update:status', $event)"
    ></ApngComp>
    <VideoComp
      v-else-if="isVideo && url"
      :url="url"
      :loop="loop"
      :status="status"
      @update:status="$emit('update:status', $event)"
    ></VideoComp>
    <CoreComp
      v-else
      v-bind="$props"
      @update:status="$emit('update:status', $event)"
    ></CoreComp>
  </ProviderComp>
</template>
