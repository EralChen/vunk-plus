<script lang="ts" setup>
import type { AnyFunc } from '@vunk/shared'
import type { PropType } from 'vue'
import { useDeferred } from '@vunk/core/composables'
import { noop } from '@vunk/shared/function'
import { Deferred } from '@vunk/shared/promise'
import { consola } from 'consola'
import { nextTick, onMounted, shallowRef, watch } from 'vue'
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
  processing: {
    type: Function as PropType<AnyFunc>,
    default: noop,
  },
})
const emit = defineEmits(['update:status'])
const theDef = shallowRef<Deferred<any>>()

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
