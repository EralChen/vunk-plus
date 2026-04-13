<script lang="ts" setup>
import { ArrowRightBold } from '@element-plus/icons-vue'
import { VkScrollbar } from '@vunk-plus/components/scrollbar'
import { ElCollapseTransition, ElIcon } from 'element-plus'
import { computed, nextTick, ref, useSlots, watch } from 'vue'
import { props as dProps, emits } from './ctx'

defineOptions({
  name: 'VkThinking',
  inheritAttrs: false,
})

const props = defineProps(dProps)
const emit = defineEmits(emits)
const slots = useSlots()

const isExpanded = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    isExpanded.value = newVal
  },
)

watch(
  () => props.status,
  (newVal) => {
    if (newVal === 'end' && props.autoCollapse) {
      isExpanded.value = false
      emit('update:modelValue', false)
    }
  },
)

const displayedContent = computed(() => {
  return props.status === 'error' ? '思考过程中出现错误' : props.content
})

const hasContent = computed(() => {
  return Boolean(slots.default) || Boolean(displayedContent.value)
})

const showSkipAction = computed(() => {
  return props.showSkip && !props.disabled && props.status === 'thinking'
})

const titleText = computed(() => {
  if (props.status === 'error')
    return '分析出现问题'

  if (props.status === 'cancel')
    return '已跳过思考'

  return props.title
})

const cssVars = computed(() => ({
  '--vk-thinking-animation-duration': props.duration,
  '--vk-thinking-button-width': props.buttonWidth,
  '--vk-thinking-max-width': props.maxWidth,
  '--vk-thinking-background-color': props.backgroundColor,
  '--vk-thinking-color': props.color,
  '--vk-thinking-radius': props.radius,
  '--vk-thinking-border-color': props.borderColor,
  '--vk-thinking-body-max-height': props.maxHeight || 'none',
  '--vk-thinking-font-size-base': '16px',
  '--vk-thinking-font-size-title': '1.125em',
  '--vk-thinking-font-size-skip': '1em',
  '--vk-thinking-font-size-content': '0.9em',
  '--vk-thinking-font-size-caret': '0.8125em',
}))

const scrollbarRef = ref<InstanceType<typeof VkScrollbar>>()

watch(
  () => [props.content, isExpanded.value, props.status],
  () => {
    if (props.status === 'thinking' && isExpanded.value) {
      nextTick(() => {
        scrollbarRef.value?.scrollToBottom({
          behavior: 'auto',
        })
      })
    }
  },
  { flush: 'post' },
)

function emitChange () {
  emit('change', {
    value: isExpanded.value,
    status: props.status,
  })
  emit('update:modelValue', isExpanded.value)
}

function toggleExpand () {
  if (props.disabled || !hasContent.value)
    return

  isExpanded.value = !isExpanded.value
  emitChange()
}

function skipThinking () {
  if (props.disabled)
    return

  isExpanded.value = false
  emitChange()
  emit('skip', {
    value: false,
    status: props.status,
  })
}
</script>

<template>
  <div class="vk-thinking" :style="cssVars">
    <section
      class="vk-thinking__card"
      :class="[
        `is-${status}`,
        {
          'is-disabled': disabled,
          'is-expanded': isExpanded && hasContent,
        },
      ]"
    >
      <header class="vk-thinking__header">
        <button
          class="vk-thinking__toggle"
          type="button"
          :disabled="disabled"
          @click="toggleExpand"
        >
          <span class="vk-thinking__title">{{ titleText }}：</span>
          <ElIcon class="vk-thinking__caret" :class="{ 'is-expanded': isExpanded }">
            <ArrowRightBold />
          </ElIcon>
        </button>

        <button
          v-if="showSkipAction"
          class="vk-thinking__skip"
          type="button"
          @click.stop="skipThinking"
        >
          {{ skipText }}
        </button>
      </header>

      <ElCollapseTransition>
        <div v-show="isExpanded && hasContent" class="vk-thinking__body">
          <VkScrollbar
            ref="scrollbarRef"
            class="vk-thinking__scrollbar"
            :max-height="maxHeight"
          >
            <slot :content="displayedContent" :status="status">
              <div class="vk-thinking__content">
                {{ displayedContent }}
              </div>
            </slot>
          </VkScrollbar>
        </div>
      </ElCollapseTransition>
    </section>
  </div>
</template>

<style>
.vk-thinking {
  width: 100%;
  max-width: var(--vk-thinking-max-width);
  color: var(--vk-thinking-color);
  font-size: var(--vk-thinking-font-size-base);
}

.vk-thinking__card {
  width: 100%;
  border: 1px solid var(--vk-thinking-border-color);
  border-radius: var(--vk-thinking-radius);
  background: var(--vk-thinking-background-color);
  box-sizing: border-box;
  overflow: hidden;
}

.vk-thinking__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 1.5em 1.75em;
}

.vk-thinking__card.is-expanded .vk-thinking__header {
  padding-bottom: 0.75em;
}

.vk-thinking__toggle {
  min-width: var(--vk-thinking-button-width);
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.vk-thinking__toggle:disabled {
  cursor: not-allowed;
}

.vk-thinking__title {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  color: var(--el-text-color-primary);
  font-size: var(--vk-thinking-font-size-title);
  font-weight: 700;
  line-height: 1.5;
}

.vk-thinking__card.is-thinking .vk-thinking__title {
  animation: vk-thinking-blink 1.6s ease-in-out infinite;
}

.vk-thinking__caret {
  font-size: var(--vk-thinking-font-size-caret);
  flex: none;
  color: var(--el-text-color-secondary);
  transform: rotate(0deg);
  transform-origin: center;
  transition: transform var(--vk-thinking-animation-duration) ease;
}

.vk-thinking__caret.is-expanded {
  transform: rotate(90deg);
}

.vk-thinking__skip {
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--el-text-color-secondary);
  font-size: var(--vk-thinking-font-size-skip);
  line-height: 1.5;
  cursor: pointer;
  white-space: nowrap;
}

.vk-thinking__skip:hover {
  color: var(--el-text-color-primary);
}

.vk-thinking__body {
  padding: 0 1.75em 1.5em;
}

.vk-thinking__content {
  color: var(--vk-thinking-color);
  font-size: var(--vk-thinking-font-size-content);
  line-height: 2;
  white-space: pre-wrap;
  word-break: break-word;
}

.vk-thinking__content p,
.vk-thinking__content ul,
.vk-thinking__content ol {
  margin: 0 0 12px;
}

.vk-thinking__content ul,
.vk-thinking__content ol {
  padding-left: 24px;
}

.vk-thinking__content li{
  margin-bottom: 8px;
}

.vk-thinking__card.is-disabled {
  opacity: 0.7;
}

@keyframes vk-thinking-blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.58;
  }
}

@media (width <= 768px) {
  .vk-thinking {
    --vk-thinking-font-size-base: 14px;
  }

  .vk-thinking__header {
    padding: 1.2857em 1.4286em;
  }

  .vk-thinking__card.is-expanded .vk-thinking__header {
    padding-bottom: 0.7143em;
  }

  .vk-thinking__body {
    padding: 0 1.4286em 1.2857em;
  }
}
</style>
