<script lang="ts" setup>
import { VkLottieAnimation } from '@vunk-plus/components/lottie-animation'
import menu_or_close from './menu_or_close.json?url'


</script>
<template>
  <div h-200px w-200px>
    <VkLottieAnimation
      :path="menu_or_close"
    ></VkLottieAnimation>
  </div>
</template>