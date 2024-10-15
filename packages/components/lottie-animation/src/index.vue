<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import lottie from 'lottie-web'
export default defineComponent({
  name: 'VkLottieAnimation',
  props,
  emits,
  setup (props, { emit }) {

    const lottieNode = ref() as Ref<HTMLDivElement>

    onMounted(() => {

      const animation = lottie.loadAnimation({
        container: lottieNode.value,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: props.path,
      })


      animation.addEventListener('complete', () => {
        emit('load', { animation })
      })

      animation.goToAndPlay(50 * animation.totalFrames / 100)
  


    })
    
    return {
      lottieNode,
    }
  },
})
</script>
<template>
  <div
    ref="lottieNode"
    class="vk-lottie-animation"
  ></div>
  <slot></slot>
</template>
<style>
.vk-lottie-animation {
  width: 100%;
  height: 100%;
}
</style>