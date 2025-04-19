<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import { VkIndependent } from '@vunk-plus/components/independent'
import { setData } from '@vunk/core'
import { MetahumanBackground, MetahumanStatus } from '_c/metahuman-background'
import { computed, ref, shallowRef } from 'vue'

const bubbleData = ref<__VkBubbleList.RenderData>({})
const agentChatContext = shallowRef(
  {} as __VkAgentChatProvider.AgentChatContext,
)
const lastBubbleData = computed(() => {
  const lastBubble = agentChatContext.value.simplicity?.items.value.at(-1)
  if (lastBubble?.key && bubbleData.value[lastBubble.key]) {
    return bubbleData.value[lastBubble.key]
  }
  return {}
})
const broadcasting = computed(() => {
  return lastBubbleData.value.meta?.broadcasting === true
})
</script>

<template>
  <div h-full w-full pos-relative>
    <div position-absolute left-0 top-0 z-10>
      {{ lastBubbleData }}
    </div>
    <VkAgentChatProvider @load="agentChatContext = $event">
      <VkIndependent
        class="home-independent"
        :data="bubbleData"
        @set-data="setData(bubbleData, $event)"
      >
        <template #background>
          <MetahumanBackground
            :status="broadcasting
              ? MetahumanStatus.SPEAKING
              : MetahumanStatus.SILENT
            "
          ></MetahumanBackground>
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
