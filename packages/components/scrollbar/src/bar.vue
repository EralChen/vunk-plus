<script lang="ts" setup>
import { GAP, scrollbarContextKey } from 'element-plus'
import { inject, ref } from 'vue'
import { barProps } from './bar'
import Thumb from './thumb.vue'

const props = defineProps(barProps)

const scrollbar = inject(scrollbarContextKey)

const moveX = ref(0)
const moveY = ref(0)
const sizeWidth = ref('')
const sizeHeight = ref('')
const ratioY = ref(1)
const ratioX = ref(1)

function handleScroll (wrap: HTMLDivElement) {
  if (wrap) {
    const offsetHeight = wrap.offsetHeight - GAP
    const offsetWidth = wrap.offsetWidth - GAP

    moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * ratioY.value
    moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * ratioX.value
  }
}

function update () {
  const wrap = scrollbar?.wrapElement
  if (!wrap)
    return
  const offsetHeight = wrap.offsetHeight - GAP
  const offsetWidth = wrap.offsetWidth - GAP

  const originalHeight = offsetHeight ** 2 / wrap.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrap.scrollWidth
  const height = Math.max(originalHeight, props.minSize)
  const width = Math.max(originalWidth, props.minSize)

  ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height))
  ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width))

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
}

defineExpose({
  handleScroll,
  update,
})
</script>

<template>
  <Thumb :move="moveX" :ratio="ratioX" :size="sizeWidth" :always="always" />
  <Thumb
    :move="moveY"
    :ratio="ratioY"
    :size="sizeHeight"
    vertical
    :always="always"
  />
</template>
