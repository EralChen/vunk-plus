<script lang="ts" setup>
import type { ScrollbarDirection } from 'element-plus'
import type { CSSProperties, StyleValue } from 'vue'
import type { BarInstance } from './bar'
import { isObject, useEventListener, useResizeObserver } from '@vueuse/core'
import { VkAsyncTeleport } from '@vunk/core/components/async-teleport'
import { scrollbarContextKey, scrollbarEmits, scrollbarProps, useNamespace } from 'element-plus'

import {
  computed,
  nextTick,
  onActivated,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import Bar from './bar.vue'
import { addUnit, isNumber } from './util'

const props = defineProps({
  ...scrollbarProps,
  appendTo: null,
})

const emit = defineEmits(scrollbarEmits)

const COMPONENT_NAME = 'ElScrollbar'

const ns = useNamespace('scrollbar')

let stopResizeObserver: (() => void) | undefined
let stopWrapResizeObserver: (() => void) | undefined
let stopResizeListener: (() => void) | undefined
let wrapScrollTop = 0
let wrapScrollLeft = 0
let direction = '' as ScrollbarDirection
const distanceScrollState = {
  bottom: false,
  top: false,
  right: false,
  left: false,
}

const scrollbarRef = ref<HTMLDivElement>()
const wrapRef = ref<HTMLDivElement>()
const resizeRef = ref<HTMLElement>()
const barRef = ref<BarInstance>()

const wrapStyle = computed<StyleValue>(() => {
  const style: CSSProperties = {}
  if (props.height)
    style.height = addUnit(props.height)
  if (props.maxHeight)
    style.maxHeight = addUnit(props.maxHeight)
  return [props.wrapStyle, style]
})

const wrapKls = computed(() => {
  return [
    props.wrapClass,
    ns.e('wrap'),
    { [ns.em('wrap', 'hidden-default')]: !props.native },
  ]
})

const resizeKls = computed(() => {
  return [ns.e('view'), props.viewClass]
})

function shouldSkipDirection (direction: ScrollbarDirection) {
  return distanceScrollState[direction] ?? false
}

const DIRECTION_PAIRS: Record<ScrollbarDirection, ScrollbarDirection> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}
function updateTriggerStatus (arrivedStates: Record<string, boolean>) {
  const oppositeDirection = DIRECTION_PAIRS[direction]
  if (!oppositeDirection)
    return

  const arrived = arrivedStates[direction]
  const oppositeArrived = arrivedStates[oppositeDirection]

  if (arrived && !distanceScrollState[direction]) {
    distanceScrollState[direction] = true
  }

  if (!oppositeArrived && distanceScrollState[oppositeDirection]) {
    distanceScrollState[oppositeDirection] = false
  }
}

function handleScroll () {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value)
    const prevTop = wrapScrollTop
    const prevLeft = wrapScrollLeft
    wrapScrollTop = wrapRef.value.scrollTop
    wrapScrollLeft = wrapRef.value.scrollLeft

    const arrivedStates = {
      bottom:
        wrapScrollTop + wrapRef.value.clientHeight
        >= wrapRef.value.scrollHeight - props.distance,
      top: wrapScrollTop <= props.distance && prevTop !== 0,
      right:
        wrapScrollLeft + wrapRef.value.clientWidth
        >= wrapRef.value.scrollWidth - props.distance
        && prevLeft !== wrapScrollLeft,
      left: wrapScrollLeft <= props.distance && prevLeft !== 0,
    }

    emit('scroll', {
      scrollTop: wrapScrollTop,
      scrollLeft: wrapScrollLeft,
    })

    if (prevTop !== wrapScrollTop) {
      direction = wrapScrollTop > prevTop ? 'bottom' : 'top'
    }
    if (prevLeft !== wrapScrollLeft) {
      direction = wrapScrollLeft > prevLeft ? 'right' : 'left'
    }
    if (props.distance > 0) {
      if (shouldSkipDirection(direction)) {
        return
      }
      updateTriggerStatus(arrivedStates)
    }
    if (arrivedStates[direction])
      // eslint-disable-next-line vue/custom-event-name-casing
      emit('end-reached', direction)
  }
}

function scrollTo (xCord: number, yCord?: number): void
function scrollTo (options: ScrollToOptions): void
function scrollTo (arg1: unknown, arg2?: number) {
  if (isObject(arg1)) {
    wrapRef.value!.scrollTo(arg1)
  }
  else if (isNumber(arg1) && isNumber(arg2)) {
    wrapRef.value!.scrollTo(arg1, arg2)
  }
}

function setScrollTop (value: number) {
  if (!isNumber(value)) {
    // debugWarn(COMPONENT_NAME, 'value must be a number')
    console.warn(COMPONENT_NAME, 'value must be a number')
    return
  }
  wrapRef.value!.scrollTop = value
}

function setScrollLeft (value: number) {
  if (!isNumber(value)) {
    // debugWarn(COMPONENT_NAME, 'value must be a number')
    console.warn(COMPONENT_NAME, 'value must be a number')
    return
  }
  wrapRef.value!.scrollLeft = value
}

function update () {
  barRef.value?.update()
  distanceScrollState[direction] = false
}

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObserver?.()
      stopWrapResizeObserver?.()
      stopResizeListener?.()
    }
    else {
      ;({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update))
      ;({ stop: stopWrapResizeObserver } = useResizeObserver(wrapRef, update))
      stopResizeListener = useEventListener('resize', update)
    }
  },
  { immediate: true },
)

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native) {
      nextTick(() => {
        update()
        if (wrapRef.value) {
          barRef.value?.handleScroll(wrapRef.value)
        }
      })
    }
  },
)

provide(
  scrollbarContextKey,
  reactive({
    scrollbarElement: scrollbarRef,
    wrapElement: wrapRef,
  }) as never,
)

onActivated(() => {
  if (wrapRef.value) {
    wrapRef.value.scrollTop = wrapScrollTop
    wrapRef.value.scrollLeft = wrapScrollLeft
  }
})

onMounted(() => {
  if (!props.native) {
    nextTick(() => {
      update()
    })
  }
})
onUpdated(() => update())

defineExpose({
  /** @description scrollbar wrap ref */
  wrapRef,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll,
})
</script>

<template>
  <div ref="scrollbarRef" :class="ns.b()">
    <div
      ref="wrapRef"
      :class="wrapKls"
      :style="wrapStyle"
      :tabindex="tabindex"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        :id="id"
        ref="resizeRef"
        :class="resizeKls"
        :style="viewStyle"
        :role="role"
        :aria-label="ariaLabel"
        :aria-orientation="ariaOrientation"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <VkAsyncTeleport :disabled="!appendTo" :to="appendTo">
        <Bar ref="barRef" :always="always" :min-size="minSize" />
      </VkAsyncTeleport>
    </template>
  </div>
</template>
