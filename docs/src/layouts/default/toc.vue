<script lang="ts" setup>
import VPDocAsideOutline from '#/vitepress/components/VPDocAsideOutline.vue'
import { MenuItem, getHeaders } from '#/vitepress/composables/outline'
import { shallowRef } from 'vue'
import { onContentUpdated } from '@vunk/shared/vike/vue/hooks'
const headers = shallowRef<MenuItem[]>([])



onContentUpdated(() => {
  headers.value = getHeaders(2)
}, {
  hooks: ['mounted', 'updated'],
})




</script>
<template>
  <VPDocAsideOutline
    :headers="headers"
  ></VPDocAsideOutline>
</template>
