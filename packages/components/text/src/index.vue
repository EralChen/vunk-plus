<script lang="ts" setup>
import { VkWrapper } from '@vunk/core/components/wrapper'
import { ElTooltip, useFormSize, useNamespace } from 'element-plus'
import { computed, onMounted, onUpdated, ref, useAttrs } from 'vue'
import { createTextBindProps, createTooltipBindProps, props as dProps } from './ctx'

defineOptions({
  name: 'ElText',
  inheritAttrs: false,
})
const props = defineProps(dProps)
const textProps = createTextBindProps(props)
const tooltipProps = createTooltipBindProps(props, ['content'])

const isUndefined = (val: any): val is undefined => val === undefined
const textRef = ref<HTMLElement>()

const textSize = useFormSize()
const ns = useNamespace('text')

const hasTitle = ref(false)

const textKls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(textSize.value),
  ns.is('truncated', props.truncated),
  ns.is('line-clamp', !isUndefined(props.lineClamp)),
])

function bindTitle () {
  const inheritTitle = useAttrs().title
  if (inheritTitle)
    return
  let shouldAddTitle = false
  if (props.truncated) {
    const width = textRef.value?.offsetWidth
    const scrollWidth = textRef.value?.scrollWidth
    if (width && scrollWidth && scrollWidth > width) {
      shouldAddTitle = true
    }
  }
  else if (!isUndefined(props.lineClamp)) {
    const height = textRef.value?.offsetHeight
    const scrollHeight = textRef.value?.scrollHeight
    if (height && scrollHeight && scrollHeight > height) {
      shouldAddTitle = true
    }
  }
  hasTitle.value = shouldAddTitle
}

onMounted(bindTitle)
onUpdated(bindTitle)
</script>

<template>
  <VkWrapper
    :is="ElTooltip"
    :show="hasTitle"
    :content="textRef?.textContent"
    v-bind="tooltipProps"
  >
    <component
      :is="tag"
      ref="textRef"
      :class="textKls"
      :style="{ '-webkit-line-clamp': lineClamp }"
      v-bind="{
        ...textProps,
        ...$attrs,
      }"
    >
      <slot />
    </component>

    <template v-if="$slots.content" #content>
      <slot name="content" :content="textRef?.textContent" />
    </template>
  </VkWrapper>
</template>
