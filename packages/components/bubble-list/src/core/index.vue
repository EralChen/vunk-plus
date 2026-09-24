<script setup lang="ts">
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { PropType, TeleportProps } from 'vue'
import { DynamicScroller, DynamicScrollerItem } from '@vunk-plus/vue-virtual-scroller'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { useResizeObserver } from '@vueuse/core'
import { VkScrollbar } from '@vunk-plus/components/scrollbar'
import { Bubble } from '@vunk-plus/element/bubble'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import loadingBg from './loading.vue'

const props = defineProps({
  list: {
    type: Array as PropType<__VkAgentChatProvider.BubbleItem[]>,
    default: () => [],
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  autoScrollThreshold: {
    type: Number,
    default: 200,
  },
  maxHeight: {
    type: String,
    default: '',
  },
  alwaysShowScrollbar: {
    type: Boolean,
    default: false,
  },
  backButtonThreshold: {
    type: Number,
    default: 80,
  },
  showBackButton: {
    type: Boolean,
    default: true,
  },
  backButtonPosition: {
    type: Object as PropType<{ bottom: string, left: string }>,
    default: () => {
      return { bottom: '20px', left: 'calc(50% - 19px)' }
    },
  },
  btnLoading: {
    type: Boolean,
    default: true,
  },
  btnColor: {
    type: String,
    default: '#409EFF',
  },
  btnIconSize: {
    type: Number,
    default: 24,
  },
  scrollbarAppendTo: {
    type: null as unknown as PropType<TeleportProps['to']>,
    default: undefined,
  },
  /** Enable virtual list rendering via vue-virtual-scroller */
  virtual: {
    type: Boolean,
    default: false,
  },
  /**
   * Key field name for virtual list items.
   * DynamicScroller uses this to uniquely identify each item.
   */
  keyField: {
    type: String,
    default: 'key',
  },
})

defineEmits({
  complete: null,
})

/* ---- refs ---- */

/** Active scrollbar – virtual and non-virtual share the same ref (v-if ensures only one alive) */
const scrollbarRef = ref<InstanceType<typeof VkScrollbar>>()

interface _ScrollerExposed {
  scrollToBottom: () => void
  scrollToItem: (index: number) => void
  getItemOffset: (index: number) => number
  getItemSize: (index: number) => number
  findItemIndex: (offset: number) => number
}

/** Virtual mode only: DynamicScroller instance */
const scrollerRef = ref<_ScrollerExposed>()

/** Virtual mode only: wraps VkScrollbar's wrapRef for pageMode scrollParent */
const virtualScrollParent = ref<HTMLElement>()

/* css var */
function initStyle() {
  document.documentElement.style.setProperty(
    '--el-bubble-list-max-height',
    props.maxHeight || '100%',
  )
  document.documentElement.style.setProperty(
    '--el-bubble-list-btn-size',
    `${props.btnIconSize}px`,
  )
}
onMounted(() => {
  initStyle()
  if (props.virtual) {
    // Capture VkScrollbar's wrapRef for pageMode scrollParent
    nextTick(() => {
      const wrap = scrollbarRef.value?.wrapRef
      if (wrap) virtualScrollParent.value = wrap as HTMLElement
    })
  }
  setTimeout(getDistanceToBottom)
})
watch(
  () => [props.maxHeight, props.btnIconSize],
  () => initStyle(),
)
/* css var END */

/* 滚动条 */
const distanceToBottom = ref<number | undefined>()

const btnShow = computed(() => {
  return props.showBackButton
    && distanceToBottom.value !== undefined
    && distanceToBottom.value > props.backButtonThreshold
})

/** 手动跳转进行中时，暂停 autoScroll 以免覆盖目标位置 */
let _manualScrolling = false

function getDistanceToBottom() {
  const wrap = scrollbarRef.value?.wrapRef as HTMLDivElement | undefined
  if (!wrap) return
  distanceToBottom.value = wrap.scrollHeight - wrap.scrollTop - wrap.clientHeight
  return distanceToBottom.value
}

function scrollToBottom() {
  if (props.virtual) {
    // Library's scrollToBottom now correctly handles pageMode
    // (patched in our local copy: resolves scrollParent instead of el.value)
    scrollerRef.value?.scrollToBottom()
    return
  }
  scrollbarRef.value?.scrollToBottom()
}

function scrollToTop() {
  if (props.virtual) {
    scrollerRef.value?.scrollToItem(0)
    return
  }
  scrollbarRef.value?.scrollToTop()
}

// 父组件触发滚动到指定气泡框
async function scrollToBubble(index: number): Promise<void> {
  if (props.virtual) {
    const wrap = scrollbarRef.value?.wrapRef
    if (!wrap) return

    _manualScrolling = true
    try {
      // 快速路径：目标已在 DOM 且可见 → 直接像素修正
      const alreadyVisible = wrap.querySelector(
        `[data-index="${index}"][data-visible="true"] .el-bubble`,
      ) as HTMLElement | null
      if (alreadyVisible) {
        const wrapRect = wrap.getBoundingClientRect()
        const bubbleRect = alreadyVisible.getBoundingClientRect()
        wrap.scrollTo({
          top: bubbleRect.top - wrapRect.top + wrap.scrollTop - 24,
          behavior: 'auto',
        })
        return
      }

      // 目标不在视口：从已测量区域末端开始，逐批向前推进。
      // 直接 scrollTo 到已知 accumulator 位置，避免依赖未测量 item 的估算值。
      // 每批滚动后，紧邻的未测量 item 被渲染并被 ResizeObserver 测量，
      // accumulator 链自然延长。
      let cursor = 0
      while (cursor < index) {
        // 滚动到当前已知 accumulator 末端，触发下一批 item 渲染
        const knownEnd = scrollerRef.value?.getItemOffset(cursor + 1) ?? 0
        wrap.scrollTo({ top: knownEnd, behavior: 'auto' })
        await new Promise<void>(resolve => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve())
          })
        })
        // 推进：每批渲染约 20 个 item
        cursor = Math.min(cursor + 20, index)
      }

      // 最终跳转 + 二次 DOM 修正：
      // 第一次修正后 scroll 会触发 re-render → ResizeObserver →
      // accumulator 更新 → item translateY 变化 → 位置再次偏移。
      // 等一帧稳定后做第二次修正保证精确。
      for (const pass of [1, 2]) {
        scrollerRef.value?.scrollToItem(index)
        await new Promise<void>(resolve => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve())
          })
        })
        const bubble = wrap.querySelector(
          `[data-index="${index}"][data-visible="true"] .el-bubble`,
        ) as HTMLElement | null
        if (bubble) {
          const wrapRect = wrap.getBoundingClientRect()
          const bubbleRect = bubble.getBoundingClientRect()
          wrap.scrollTo({
            top: bubbleRect.top - wrapRect.top + wrap.scrollTop - 24,
            behavior: 'auto',
          })
        }
      }
    }
    finally {
      _manualScrolling = false
    }
    return
  }
  _manualScrolling = true
  try {
    const container = scrollbarRef.value?.wrapRef
    if (!container) return
    const bubbles = container.querySelectorAll('.el-bubble')
    if (index >= bubbles.length) return
    const targetBubble = bubbles[index] as HTMLElement
    const containerRect = container.getBoundingClientRect()
    const bubbleRect = targetBubble.getBoundingClientRect()
    container.scrollTo({
      top: bubbleRect.top - containerRect.top + container.scrollTop,
      behavior: 'smooth',
    })
  }
  finally {
    _manualScrolling = false
  }
}

/** 获取指定 index 在内容空间中的偏移量（像素），未测量过的 item 返回估算值 */
function getItemOffset(index: number): number | undefined {
  return scrollerRef.value?.getItemOffset(index)
}

/**
 * 获取当前可见范围（index 区间），用于大纲导航高亮当前项。
 * 基于 findItemIndex + getItemOffset 估算，非实时精确值。
 */
function getVisibleRange(): { start: number, end: number } | undefined {
  const el = scrollerRef.value
  const wrap = scrollbarRef.value?.wrapRef
  if (!el || !wrap) return undefined
  const scrollTop = wrap.scrollTop
  const viewportHeight = wrap.clientHeight
  const start = el.findItemIndex(scrollTop)
  const end = el.findItemIndex(scrollTop + viewportHeight)
  return { start, end }
}

// 开启自动滚动
const scrollViewEl = ref<HTMLElement>()

onMounted(() => {
  nextTick(() => {
    scrollViewEl.value = scrollbarRef.value?.wrapRef
      ?.firstElementChild as HTMLElement
  })
})

if (props.autoScroll) {
  useResizeObserver(scrollViewEl, () => {
    if (_manualScrolling) return
    const distance = getDistanceToBottom()
    if (distance !== undefined && distance > props.autoScrollThreshold) return
    scrollToBottom()
  })
}
/* 滚动条 END */

defineExpose({
  scrollToTop,
  scrollToBottom,
  scrollToBubble,
  getItemOffset,
  getVisibleRange,
})
</script>

<template>
  <div class="vk-bubble-list-wrapper">
    <!-- Virtual mode: VkScrollbar + DynamicScroller (pageMode) -->
    <div
      v-if="virtual"
      class="vk-bubble-list-virtual-host"
      :style="{ height: maxHeight || '100%' }"
    >
      <VkScrollbar
        ref="scrollbarRef"
        class="vk-bubble-list-virtual-scrollbar"
        :always="alwaysShowScrollbar"
        :hide-after="800"
        @scroll="getDistanceToBottom"
      >
        <DynamicScroller
          v-if="virtualScrollParent"
          ref="scrollerRef"
          :items="list"
          :min-item-size="54"
          :key-field="keyField"
          :page-mode="true"
          :scroll-parent="virtualScrollParent"
          class="vk-bubble-list-dynamic-scroller"
        >
          <template #default="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :data-index="index"
              :data-visible="active"
              class="vk-bubble-list-virtual-item"
            >
              <Bubble
                :content="item.content"
                :placement="item.placement"
                :loading="item.loading"
                :shape="item.shape"
                :variant="item.variant"
                :is-markdown="item.isMarkdown"
                :is-fog="item.isFog"
                :typing="item.typing"
                :max-width="item.maxWidth"
                :avatar="item.avatar"
                :avatar-size="item.avatarSize"
                :avatar-gap="item.avatarGap"
                :avatar-shape="item.avatarShape"
                :avatar-src-set="item.avatarSrcSet"
                :avatar-alt="item.avatarAlt"
                :avatar-fit="item.avatarFit"
                :no-style="item.noStyle"
                :class="{
                  [`is-${item.role}`]: true,
                }"
              >
                <template v-if="$slots.avatar" #avatar>
                  <slot name="avatar" :item="item" />
                </template>
                <template v-if="$slots.header" #header>
                  <slot name="header" :item="item" />
                </template>
                <template v-if="$slots.content" #content>
                  <slot name="content" :item="item" />
                </template>
                <template v-if="$slots.footer" #footer>
                  <slot name="footer" :item="item" />
                </template>
                <template v-if="$slots.loading" #loading>
                  <slot name="loading" :item="item" />
                </template>
              </Bubble>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </VkScrollbar>
    </div>

    <!-- Non-virtual rendering (original) -->
    <VkScrollbar
      v-else
      ref="scrollbarRef"
      class="vk-bubble-list"
      :append-to="scrollbarAppendTo"
      :always="alwaysShowScrollbar"
      :hide-after="800"
      @scroll="getDistanceToBottom"
    >
      <Bubble
        v-for="(item, index) in list"
        :key="item.key || index"
        :content="item.content"
        :placement="item.placement"
        :loading="item.loading"
        :shape="item.shape"
        :variant="item.variant"
        :is-markdown="item.isMarkdown"
        :is-fog="item.isFog"
        :typing="item.typing"
        :max-width="item.maxWidth"
        :avatar="item.avatar"
        :avatar-size="item.avatarSize"
        :avatar-gap="item.avatarGap"
        :avatar-shape="item.avatarShape"
        :avatar-src-set="item.avatarSrcSet"
        :avatar-alt="item.avatarAlt"
        :avatar-fit="item.avatarFit"
        :no-style="item.noStyle"
        :class="{
          [`is-${item.role}`]: true,
        }"
      >
        <template v-if="$slots.avatar" #avatar>
          <slot name="avatar" :item="item" />
        </template>
        <template v-if="$slots.header" #header>
          <slot name="header" :item="item" />
        </template>
        <template v-if="$slots.content" #content>
          <slot name="content" :item="item" />
        </template>
        <template v-if="$slots.footer" #footer>
          <slot name="footer" :item="item" />
        </template>
        <template v-if="$slots.loading" #loading>
          <slot name="loading" :item="item" />
        </template>
      </Bubble>
    </VkScrollbar>

    <div
      v-show="btnShow"
      class="vk-bubble-list-default-back-button"
      :class="{
        'vk-bubble-list-back-to-bottom-solt': $slots.backToBottom,
      }"
      :style="{
        bottom: backButtonPosition.bottom,
        left: backButtonPosition.left,
      }"
      @click="scrollToBottom"
    >
      <slot name="backToBottom">
        <el-icon
          class="vk-bubble-list-back-to-bottom-icon"
          :style="{ color: props.btnColor }"
        >
          <ArrowDownBold />
          <loadingBg
            v-if="props.btnLoading"
            class="back-to-bottom-loading-svg-bg"
          />
        </el-icon>
      </slot>
    </div>
  </div>
</template>

<style>
.vk-bubble-list-wrapper {
  position: relative;
  height: 100%;
}

/* ---- Non-virtual scrollbar ---- */
.vk-bubble-list {
  overflow: auto;
  scroll-behavior: smooth;
  max-height: var(--el-bubble-list-max-height);
  position: relative;
}
.vk-bubble-list .el-bubble  {
  margin-bottom: 16px;
}

/* ---- Virtual scroller ---- */
.vk-bubble-list-virtual-host {
  position: relative;
}
.vk-bubble-list-virtual-scrollbar {
  height: 100%;
}
/* pageMode: the scroller itself has NO overflow; VkScrollbar provides scrolling */
.vk-bubble-list-dynamic-scroller {
  /* no overflow here – parent VkScrollbar owns the scroll */
}

/* Virtual items are inside absolutely-positioned wrappers;
   margin-top won't work – use padding-bottom so ResizeObserver
   picks it up as part of the measured height. */
.vk-bubble-list-virtual-item {
  padding-bottom: 16px;
}

.vk-bubble-list-default-back-button {
  position: absolute;
  user-select: none;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow:
    0 0 4px 0 rgba(0, 0, 0, 0.02),
    0 6px 10px 0 rgba(47, 53, 64, 0.1);
  transition: all 0.3s ease;
  z-index: 100;
}

.vk-bubble-list-default-back-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.vk-bubble-list-default-back-button .vk-bubble-list-back-to-bottom-icon {
  font-size: var(--el-bubble-list-btn-size);
  position: relative;
}

@keyframes vk-bubble-is-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.vk-bubble-list-default-back-button .vk-bubble-list-back-to-bottom-icon .back-to-bottom-loading-svg-bg {
  position: absolute;
  font-size: calc(var(--el-bubble-list-btn-size) + 26px);
  animation: vk-bubble-is-loading 1s infinite linear;
}

.vk-bubble-list-back-to-bottom-solt {
  position: sticky;
  user-select: none;
  cursor: initial;
  width: fit-content;
  height: fit-content;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: initial;
}

.vk-bubble-list-back-to-bottom-solt:hover {
  transform: translateY(0px);
  box-shadow: initial;
}
</style>