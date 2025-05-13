<script setup lang="ts">
defineProps({
  content: {
    type: String,
    default: '自定义渲染内容',
  },
})
</script>

<template>
  <div class="my-custom-template">
    <div v-html="content"></div>
  </div>
</template>
