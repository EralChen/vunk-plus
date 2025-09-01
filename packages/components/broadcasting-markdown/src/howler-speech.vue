<script lang="ts" setup>
import type { PropType } from 'vue'
import { TickerStatus } from '@vunk/shared/enum'
import { onMounted } from 'vue'
import { useHowlerParagraph } from './use'

const props = defineProps({
  /**
   * 语音资源
   */
  source: {
    type: String,
    default: '',
  },
  status: {
    type: String as PropType<TickerStatus>,
    default: TickerStatus.pending,
  },
})

const emit = defineEmits({
  'update:status': null,
  'load': null,
  'error': null,
})

if (!props.source) {
  emit('update:status', TickerStatus.stopped)
}
else {
  useHowlerParagraph(props, emit)
}

onMounted(() => {
  emit('load')
})
</script>

<template>
  <slot :status="status"></slot>
</template>
