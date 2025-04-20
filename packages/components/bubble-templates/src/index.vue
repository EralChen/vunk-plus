<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk-plus/components/agent-chat-provider'
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { PropType } from 'vue'
import { VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
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

const typed = (e: __VkBubbleList.Item) => e
</script>

<template>
  <VkRendererTemplate type="Typewriter">
    <template #default="{ props }">
      <Thinking
        v-if="props.thinkingContent && modules?.includes('Thinking')"
        :content="props.thinkingContent"
        :status="props.thinkingStatus"
      >
      </Thinking>
      <Typewriter
        :content="props.content"
        :typing="props.typing"
        :is-markdown="props.isMarkdown"
        :is-fog="props.isFog"
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
        :source="props.content"
        :keep-read="!props.seviceEnd"
        :text-to-speech="textToSpeech"
        @vue:mounted="() => emitSetData({
          k: [props.key, 'templateType'],
          v: 'VkBroadcastingMarkdown',
        })"
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
