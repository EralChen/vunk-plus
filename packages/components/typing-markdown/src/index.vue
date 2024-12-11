<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, computed, ref, watch } from 'vue'
import { computedAsync, debouncedRef } from '@vueuse/core'
import { markdownItPromise } from './core'

export default defineComponent({
  name: 'VkTypingMarkdown',
  props,
  emits,
  setup (props,  { emit }) {
    const currentIndex = ref(0)
    const currentText = computed(() => {
      if (props.disabled) {
        return props.source
      }
      return props.source.substring(0, currentIndex.value)
    })

    const theMarkdownIt = markdownItPromise.then(md => {
      props.markdownItSetup?.(md)
      return md
    })
   
    const htmlText = computedAsync(async () => {
      currentText.value // trigger dependency
      const md = await theMarkdownIt
      return md.render(currentText.value)
    }, '')

    const isTyping = computed(() => {
      // 非暂停下，props.source.length 和 currentIndex.value 不相等
      return !props.pause && !props.disabled
      && currentIndex.value !== props.source.length
    })
    const isDebouncedTyping = debouncedRef(isTyping, 100)

    const isFinished = ref(false)
    function typeWriter () {
      if (props.pause || props.disabled) {
        return
      }
      if (currentIndex.value < props.source.length) {
        currentIndex.value++

        emit('typing')

        setTimeout(typeWriter, props.delay)
      } else {
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

    watch(
      () => isFinished.value 
      && currentIndex.value < props.source.length, 
      () => { // 说明source变化了
        isFinished.value = false
        typeWriter()
      },
    )


  
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

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>