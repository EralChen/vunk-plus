<script lang="ts" setup>
import { VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkIndependent } from '@vunk-plus/components/independent'
import { setData } from '@vunk/core'
import MetahumanBackground from '_c/metahuman-background/index.vue'
import { ref } from 'vue'

const bubbleData = ref({})
</script>

<template>
  <div h-full w-full pos-relative>
    <div position-absolute left-0 top-0 z-10>
      {{ bubbleData }}
    </div>
    <VkAgentChatProvider>
      <VkIndependent
        class="home-independent"
        :data="bubbleData"
        @set-data="setData(bubbleData, $event)"
      >
        <template #background>
          <MetahumanBackground></MetahumanBackground>
        </template>
      </VkIndependent>
    </VkAgentChatProvider>
  </div>
</template>

<style>
.home-independent{
  overflow: hidden;
}
.home-independent .vk-independent-main__duplex{
  padding-top: 40vh;
}
.home-independent .el-bubble-list > .el-bubble:last-child {
  margin-bottom: 40px;
}
.home-independent .vk-independent-main__bubbles{

  /* mask-image: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1) 100%
  ); */

}
</style>
