<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'
import { parse } from 'marked'

const chatContainer = ref<HTMLElement>() as Ref<HTMLElement>
const markdownText = '# Hello\n\nThis is a **Markdown** message.\n\n- Item 1\n- Item 2'
let currentIndex = 0
const delay = 50 // 每个字之间的延迟（50ms）

// 用于逐字逐句显示内容的函数
async function typeWriter () {
  if (currentIndex < markdownText.length) {
    // 添加下一个字符到内容
    currentIndex++
    chatContainer.value.innerHTML = await parse(
      markdownText.substring(0, currentIndex),
    )
    // 递归调用，模拟打字机效果
    setTimeout(typeWriter, delay)
  }
}

onMounted(() => {
  typeWriter()
})

</script>
<template>
  <div ref="chatContainer" class="chat">
  </div>
</template>
