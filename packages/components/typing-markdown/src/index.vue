<script lang="ts">
import { computedAsync, debouncedRef } from '@vueuse/core'
import { useModelComputed } from '@vunk/core/composables'
import { noop } from '@vunk/shared/function'
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import { markdownItPromise } from './core'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkTypingMarkdown',
  props,
  emits,
  setup (props, { emit }) {
    const currentIndex = ref(0)
    const currentText = computed(() => {
      if (props.disabled) {
        return props.source
      }
      return props.source.substring(0, currentIndex.value)
    })

    const theMarkdownIt = markdownItPromise.then((md) => {
      props.markdownItSetup?.(md)
      return md
    })

    const htmlText = computedAsync(async () => {
      noop(currentText.value) // trigger dependency
      const md = await theMarkdownIt
      return md.render(currentText.value)
    }, '')

    const isTyping = computed(() => {
      // 非暂停下，props.source.length 和 currentIndex.value 不相等
      return !props.pause && !props.disabled
        && currentIndex.value !== props.source.length
    })
    const isDebouncedTyping = debouncedRef(isTyping, 100)

    const isFinished = useModelComputed({
      default: false,
      key: 'finished',
    }, props, emit)

    function typeWriter () {
      if (props.pause || props.disabled || props.source.length === 0) {
        return
      }
      if (currentIndex.value < props.source.length) {
        currentIndex.value++
        emit('typing')

        setTimeout(typeWriter, props.delay)
      }
      else {
        isFinished.value = true
      }
    }
    watch(() => props.pause || props.disabled, (v) => {
      if (!v) {
        typeWriter()
      }
    }, {
      flush: 'post',
      immediate: true,
    })

    watch(() => currentIndex.value < props.source.length, () => {
      isFinished.value = false
      typeWriter()
    })

    return {
      htmlText,
      isDebouncedTyping,
    }
  },
})
</script>

<template>
  <div
    class="vk-typing-markdown"
    :class="{
      'is-typing': isDebouncedTyping,
      'is-loading': loading,
    }"
    v-html="htmlText"
  >
  </div>
</template>

<style>
.vk-typing-markdown.is-typing .is-last::after{
  animation: blink 0.7s infinite;
  content: '|';
}

.vk-typing-markdown.is-loading:not(.is-typing) .is-last::after {
  content: '';
  display: inline-block;
  width: 1em;
  text-align: left;
  animation: dotTyping 1.2s steps(4, end) infinite;
}

@keyframes dotTyping {
  0%   { content: '';     }
  25%  { content: '.';    }
  50%  { content: '..';   }
  75%  { content: '...';  }
  100% { content: '';     }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
