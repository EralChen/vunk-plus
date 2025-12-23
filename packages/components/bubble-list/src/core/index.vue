<script setup lang="ts">
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { AnyFunc } from '@vunk/shared'
import type { ElScrollbar } from 'element-plus'
import type { PropType, Ref, TeleportProps } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { useResizeObserver } from '@vueuse/core'
import { VkScrollbar } from '@vunk-plus/components/scrollbar'
import { Bubble } from '@vunk-plus/element/bubble'
import { computed, onMounted, ref, watch } from 'vue'
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

})

defineEmits({
  complete: null,
})

const scrollbarRef = ref<{
  scrollToBottom: AnyFunc
  scrollToTop: AnyFunc
} & InstanceType<typeof ElScrollbar>>()

/* css var */
function initStyle () {
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
})
watch(
  () => [props.maxHeight, props.btnIconSize],
  () => {
    initStyle()
  },
)
/* css var END */

/* 滚动条 */
const distanceToBottom = ref<number | undefined>()
const scrollViewEl = computed(() => scrollbarRef.value?.wrapRef?.firstElementChild) as unknown as Ref<HTMLDivElement>

const btnShow = computed(() => {
  return props.showBackButton
    && distanceToBottom.value !== undefined
    && distanceToBottom.value > props.backButtonThreshold
})
onMounted(() => {
  setTimeout(getDistanceToBottom)
})
function getDistanceToBottom () {
  const el = scrollbarRef.value?.$el as HTMLDivElement
  const wrap = scrollbarRef.value?.wrapRef as HTMLDivElement
  if (!el || !wrap) {
    return
  }
  distanceToBottom.value = wrap.scrollHeight - wrap.scrollTop - wrap.clientHeight
  return distanceToBottom.value
}
function scrollToBottom (...args) {
  scrollbarRef.value?.scrollToBottom(...args)
}

function scrollToTop (...args) {
  scrollbarRef.value?.scrollToTop(...args)
}

// 开启自动滚动
if (props.autoScroll) {
  useResizeObserver(scrollViewEl, () => {
    const distance = getDistanceToBottom()
    if (distance !== undefined && distance > props.autoScrollThreshold) {
      return
    }
    scrollToBottom()
  })
}

// 父组件触发滚动到指定气泡框
function scrollToBubble (index: number) {
  const container = scrollbarRef.value?.wrapRef
  if (!container)
    return

  const bubbles = container.querySelectorAll('.el-bubble')
  if (index >= bubbles.length)
    return

  const targetBubble = bubbles[index] as HTMLElement

  // 计算相对位置
  const containerRect = container.getBoundingClientRect()
  const bubbleRect = targetBubble.getBoundingClientRect()

  // 计算需要滚动的距离（元素顶部相对于容器顶部的位置 - 容器当前滚动位置）
  const scrollPosition
    = bubbleRect.top - containerRect.top + container.scrollTop

  // 使用容器自己的滚动方法
  container.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
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
    <VkScrollbar
      ref="scrollbarRef"
      class="vk-bubble-list"
      :append-to="scrollbarAppendTo"
      :always="alwaysShowScrollbar"
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
          <slot
            name="content"
            :item="item"
          />
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
.vk-bubble-list {
  overflow: auto;
  scroll-behavior: smooth;
  max-height: var(--el-bubble-list-max-height);
  position: relative;
}
.vk-bubble-list .el-bubble + .el-bubble {
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

.vk-bubble-list-default-back-button  .vk-bubble-list-back-to-bottom-icon {
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
.vk-bubble-list-default-back-button  .vk-bubble-list-back-to-bottom-icon .back-to-bottom-loading-svg-bg {
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
