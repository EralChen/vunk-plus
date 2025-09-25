<script lang="ts" setup>
import { onMounted, ref, useId } from 'vue'
import Player from 'xgplayer'
import Core from './core.vue'
import { props as dprops } from './ctx'
import { providePlayer } from './use'
import 'xgplayer/dist/index.min.css'

defineOptions({
  name: 'VkXgplayer',
})
const props = defineProps(dprops)
const id = useId()
const ready = ref(false)

onMounted(() => {
  const player = new Player({
    id,
    // url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
    url: props.url,
    autoplay: props.autoplay,
    height: '100%',
    width: '100%',
    ...props.defaultOptions,
  })
  providePlayer(player)
  ready.value = true
})
</script>

<template>
  <div :id="id"></div>

  <Core v-if="ready">
    <slot></slot>
  </Core>
</template>
