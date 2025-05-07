<script lang="ts">
import { VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import { setData } from '@vunk/core'
import { defineComponent } from 'vue'
import { emits, props } from './ctx'
import Paragraph from './paragraph.vue'

export default defineComponent({
  name: 'VkMetahumanBroadcasting',
  components: {
    VkBroadcastingMarkdown,
    Paragraph,
  },
  props,
  emits,
  setup (_props) {
    return {
      setData,
    }
  },
})
</script>

<template>
  <VkBroadcastingMarkdown
    :text-to-speech="textToSpeech"
    :source="source"
  >
    <template #paragraph="{ deferred, data, pause }">
      <Paragraph
        :deferred="deferred"
        :data="data"
        :pause="pause"
        :send="send"
        @set-data="setData(data, $event)"
      ></Paragraph>
    </template>
  </VkBroadcastingMarkdown>
</template>
