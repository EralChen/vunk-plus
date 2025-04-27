<script lang="ts" setup>
import type { AnyFunc } from '@vunk/shared'
import { useDeferred } from '@vunk/core/composables'
import { noop } from '@vunk/shared/function'
import { Deferred } from '@vunk/shared/promise'
import { consola } from 'consola'
import { nextTick, onMounted, type PropType, shallowRef, watch } from 'vue'
import { ParagraphStatus } from './const'

const props = defineProps({
  enable: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String as PropType<ParagraphStatus>,
    default: ParagraphStatus.initial,
  },
  pause: {
    type: Boolean,
    default: false,
  },
  processing: {
    type: Function as PropType<AnyFunc>,
    default: noop,
  },
  retryTimes: {
    type: Number,
    default: 10,
  },
})
const emit = defineEmits(['update:status'])
const theDef = shallowRef<Deferred<any>>()

let retryTimes = props.retryTimes

const processingDef = useDeferred()
onMounted(async () => {
  emit('update:status', ParagraphStatus.processing)
  await props.processing?.()
  processingDef.resolve()
})

processingDef.promise.catch(() => {
  emit('update:status', ParagraphStatus.rejected)
})

watch(() => props.enable, async (enable) => {
  if (enable) {
    init()
  }
  else {
    theDef.value = undefined
  }
}, { immediate: true })

async function init () {
  const deferred = new Deferred()
  await processingDef.promise
  emit('update:status', ParagraphStatus.pending)
  deferred.promise.then(() => {
    emit('update:status', ParagraphStatus.fulfilled)
  }).catch(async (err) => {
    consola.error('error', err)
    if (retryTimes > 0) {
      retryTimes--
      await props.processing?.()
      consola.info('retryTimes', retryTimes)
      init()
      return
    }
    emit('update:status', ParagraphStatus.rejected)
  })

  theDef.value = undefined
  nextTick(() => {
    theDef.value = deferred
  })
}
</script>

<template>
  <slot
    v-if="enable && theDef"
    :deferred="theDef"
  ></slot>
</template>
