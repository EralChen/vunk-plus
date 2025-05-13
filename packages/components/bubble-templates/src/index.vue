<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { SetDataEvent } from '@vunk/core'
import { VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { markRaw, type PropType } from 'vue'
import { Thinking, Typewriter } from 'vue-element-plus-x'

defineOptions({
  name: 'VkBubbleTemplates',
})
defineProps({
  textToSpeech: {
    type: Function as PropType<__VkBroadcastingMarkdown.TextToSpeech>,
  },
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
  <VkRendererTemplate type="Typewriter">
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
        @start="() => emitSetData({
          k: [props.key, 'completed'],
          v: false,
        })"
        @finish="() => emitSetData({
          k: [props.key, 'completed'],
          v: true,
        })"
      ></Typewriter>
    </template>
  </VkRendererTemplate>

  <VkRendererTemplate type="VkBroadcastingMarkdown">
    <template #default="{ props, emitSetData }">
      <Thinking
        v-if="props.thinkingContent && modules?.includes('Thinking')"
        :content="props.thinkingContent"
        :status="props.thinkingStatus"
      >
      </Thinking>
      <VkBroadcastingMarkdown
        :ref="(el) => setRef(emitSetData, props, el)"
        :source="props.content"
        :keep-read="!props.seviceEnd"
        :text-to-speech="textToSpeech"
        @vue:mounted="initRenderData(emitSetData, props)"
        @update:broadcasting="(v) => emitSetData({
          k: [props.key, 'meta', 'broadcasting'],
          v,
        })"
        @update:completed="(v) => emitSetData({
          k: [props.key, 'completed'],
          v,
        })"
        @update:error="(v) => emitSetData({
          k: [props.key, 'error'],
          v,
        })"
      ></VkBroadcastingMarkdown>
    </template>
  </VkRendererTemplate>
</template>
