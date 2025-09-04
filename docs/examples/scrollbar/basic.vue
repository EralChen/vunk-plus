<script lang="ts" setup>
import { VkScrollbar } from '@vunk-plus/components/scrollbar'
import { VkDuplexCalc } from '@vunk/core/components/duplex-calc'
</script>

<template>
  <VkDuplexCalc class="demo-scrollbar-basic" overflow="visible">
    <template #one>
      123121
    </template>

    <VkScrollbar
      append-to=".demo-scrollbar-basic > .vk-duplex-calc-two"
    >
      <ul>
        <li v-for="i in 50" :key="i">
          Item {{ i }}
        </li>
      </ul>
    </VkScrollbar>
  </VkDuplexCalc>
</template>

<style>
.demo-scrollbar-basic{
  padding: 12px;
  height: 400px;
}
.demo-scrollbar-basic > .vk-duplex-calc-two {
  position: relative;
  background: #f5f5f5;
}
.demo-scrollbar-basic > .vk-duplex-calc-two > .el-scrollbar__bar.is-vertical {
  right: -12px
}
</style>
