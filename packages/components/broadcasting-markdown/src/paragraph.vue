<script lang="ts" setup>
import { useReloaded, useUpdating } from '@vunk/core/composables'
import { Deferred } from '@vunk/shared/promise'
import { type PropType, shallowRef, watch } from 'vue'
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
})
const emit = defineEmits(['update:status'])

const theDef = shallowRef<Deferred<any>>()

watch(() => props.enable, (enable) => {
  if (enable) {
    init()
    emit('update:status', ParagraphStatus.pending)
  }
  else {
    theDef.value = undefined
    emit('update:status', ParagraphStatus.initial)
  }
}, { immediate: true })

function init () {
  const deferred = new Deferred()
  deferred.promise.then(() => {
    emit('update:status', ParagraphStatus.fulfilled)
  }).catch((err) => {
    console.error(err)
    emit('update:status', ParagraphStatus.rejected)
  })
  theDef.value = deferred
}
</script>

<template>
  <slot
    v-if="enable && theDef"
    :deferred="theDef"
  ></slot>
</template>
