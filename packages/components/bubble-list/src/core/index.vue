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
function scrollToBubble(index: number) {
  if (props.virtual) {
    scrollerRef.value?.scrollToItem(index)
    return
  }
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
          :key-field="'key'"
          :page-mode="true"
          :scroll-parent="virtualScrollParent"
          class="vk-bubble-list-dynamic-scroller"
        >
          <template #default="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :data-index="index"
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
.vk-bubble-list .el-bubble + .el-bubble {
  margin-top: 16px;
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

/* Spacing between virtual items */
.vk-bubble-list-virtual-item + .vk-bubble-list-virtual-item {
  margin-top: 16px;
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