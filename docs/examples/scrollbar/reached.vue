<script lang="ts" setup>
import type { __VkScrollbar } from '@vunk-plus/components/scrollbar'
import { VkScrollbar } from '@vunk-plus/components/scrollbar'
import { VkDuplexCalc } from '@vunk/core/components/duplex-calc'
import { ref } from 'vue'

const count = ref(15)
function handleEndReached (direction: __VkScrollbar.ScrollbarDirection) {
  if (direction === 'bottom') {
    console.log('Reached bottom')
    count.value += 1
  }
}

function handleContentInsufficient ({ vertical }: __VkScrollbar.ContentInsufficientEvent) {
  if (vertical) {
    console.log('Content is insufficient vertically')
    count.value += 1
  }
}

function changeSource () {
  count.value = 2
}
</script>

<template>
  <VkDuplexCalc class="demo-scrollbar-reached" overflow="visible">
    <template #one>
      <ElButton
        @click="changeSource"
      >
        Change
      </ElButton>
    </template>

    <VkScrollbar
      append-to=".demo-scrollbar-reached > .vk-duplex-calc-two"
      :hide-after="400"
      :distance="50"
      @end-reached="handleEndReached"
      @content-insufficient="handleContentInsufficient"
    >
      <ul>
        <li v-for="i in count" :key="i">
          Item {{ i }}
        </li>
      </ul>
    </VkScrollbar>
  </VkDuplexCalc>
</template>

<style>
.demo-scrollbar-reached{
  padding: 12px;
  height: 400px;
}
.demo-scrollbar-reached > .vk-duplex-calc-two {
  position: relative;
  background: #f5f5f5;
}
.demo-scrollbar-reached > .vk-duplex-calc-two > .el-scrollbar__bar.is-vertical {
  right: -12px
}
</style>
