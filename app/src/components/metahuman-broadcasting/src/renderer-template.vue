<script lang="ts" setup>
import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { SetDataEvent } from '@vunk/core'
import type { PropType } from 'vue'
import { useWebSocket } from '@vueuse/core'
import { VkThinking as Thinking } from '@vunk-plus/components/thinking'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { markRaw, onBeforeUnmount } from 'vue'
import MetahumanBroadcasting from './index.vue'

defineProps({
  textToSpeech: {
    type: Function as PropType<__VkBroadcastingMarkdown.TextToSpeech>,
  },
})

const webSocket = useWebSocket('ws://localhost:8001/ws', {
  autoReconnect: true,
})
onBeforeUnmount(() => {
  webSocket.close()
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

function updateMetaField (
  emitSetData: (e: SetDataEvent) => void,
  props: __VkBubbleList.Item,
  key: string,
  value: unknown,
) {
  emitSetData?.({
    k: [props.key, 'meta', key],
    v: value,
  })
}

function updateField (
  emitSetData: (e: SetDataEvent) => void,
  props: __VkBubbleList.Item,
  key: string,
  value: unknown,
) {
  emitSetData?.({
    k: [props.key, key],
    v: value,
  })
}
</script>

<template>
  <VkRendererTemplate type="MetahumanBroadcasting">
    <template #default="{ props, emitSetData }">
      <Thinking
        v-if="props.thinkingContent"
        :content="props.thinkingContent"
        :status="props.thinkingStatus"
      >
      </Thinking>
      <MetahumanBroadcasting
        :ref="(el) => setRef(emitSetData, props, el)"
        :web-socket="webSocket"
        :source="props.content"
        :keep-read="!props.seviceEnd"
        :text-to-speech="textToSpeech"
        @vue:mounted="initRenderData(emitSetData, props)"
        @update:broadcasting="updateMetaField(emitSetData, props, 'broadcasting', $event)"
        @update:completed="updateField(emitSetData, props, 'completed', $event)"
        @update:error="updateField(emitSetData, props, 'error', $event)"
      ></MetahumanBroadcasting>
    </template>
  </VkRendererTemplate>
</template>
