<script lang="ts" setup>
import { watchEffect } from 'vue'
import { props as dprops } from './ctx'
import { usePlayer } from './use'

const props = defineProps(dprops)

const player = usePlayer()

watchEffect(() => {
  player.url = props.url
})

watchEffect(() => {
  player.autoplay = props.autoplay
})
</script>

<template>
  <slot></slot>
</template>
