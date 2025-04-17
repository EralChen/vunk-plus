<script lang="ts" setup>
import { VkRecorderButton } from '@vunk-plus/components/recorder-button'
import { VkDuplexCalc } from '@vunk/core'
import { ref } from 'vue'

defineOptions({
  name: 'VkIndependent',
})
const mainRef = ref<HTMLElement>()
</script>

<template>
  <div class="vk-independent">
    <div ref="mainRef" class="vk-independent-main">
      <VkDuplexCalc with-resize="one">
        <template #one>
          <div>1231</div>
        </template>
        <template #two>
          <div class="vk-independent-footer">
            <div>111</div>
            <VkRecorderButton
              :append-to="mainRef"
            ></VkRecorderButton>
          </div>
        </template>
      </VkDuplexCalc>
    </div>

    <div class="vk-independent-background">
    </div>
  </div>
</template>

<style>
.vk-independent-footer{
  display: flex;
}
.vk-independent{
  width: 100%;
  height: 100%;
  position: relative;
}
.vk-independent-main{
  z-index: 1;
  inset: 0;
  position: absolute;
}
.vk-independent-background{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

}
</style>
