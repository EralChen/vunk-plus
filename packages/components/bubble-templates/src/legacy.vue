<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { SetDataEvent } from '@vunk/core'
import { VkBubbleRenderTemplate } from '@vunk-plus/components/bubble-templates'
import { markRaw, type PropType } from 'vue'
import { Thinking, Typewriter } from 'vue-element-plus-x'

defineProps({
  modules: {
    type: Array as PropType<__VkAgentChatProvider.BubbleItemModule[]>,
    default: () => ['Thinking'],
  },
})

function setRef (
  emitSetData: (e: SetDataEvent) => void,
  props: __VkBubbleList.Item,
  el: any,
) {
  if (!el) {
    return
  }
  emitSetData?.({
    k: [props.key, 'elRef'],
    v: markRaw(el),
  })
}

function initRenderData (
  emitSetData: (e: SetDataEvent) => void,
  props: __VkBubbleList.Item,
) {
  emitSetData?.({
    k: [props.key, 'meta'],
    v: props.meta ?? {},
  })
  emitSetData?.({
    k: [props.key, 'templateType'],
    v: props.templateType,
  })
}
</script>

<template>
  <VkBubbleRenderTemplate type="Typewriter">
    <template #default="{ emitSetData, props }">
      <Thinking
        v-if="props.thinkingContent && modules?.includes('Thinking')"
        :content="props.thinkingContent"
        :status="props.thinkingStatus"
      >
      </Thinking>

      <Typewriter
        :ref="(el) => setRef(emitSetData, props, el)"
        :content="props.content"
        :typing="props.typing"
        :is-markdown="props.isMarkdown"
        :is-fog="props.isFog"
        @vue:mounted="initRenderData(emitSetData, props)"
        @finish="() => props.seviceEnd && emitSetData({
          k: [props.key, 'completed'],
          v: true,
        })"
      ></Typewriter>
    </template>
  </VkBubbleRenderTemplate>
</template>
