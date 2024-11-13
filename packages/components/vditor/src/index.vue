<script lang="ts">
import Vditor from 'vditor'
import { props, emits } from './ctx'
import { Ref, defineComponent, onMounted, provide, ref, shallowRef } from 'vue'
import mitt from 'mitt'
import { Mitter } from './types'
import HandleValue from './handle-value.vue'
import HandleFullscreen from './handle-fullscreen.vue'
import { VkAsyncTeleport } from '@vunk/core'
export default defineComponent({
  name: 'VkVditor',
  components: {
    HandleValue,
    HandleFullscreen,
    VkAsyncTeleport,
  },
  props,
  emits,
  setup (props, { emit }) {
    const vditorNode = ref() as Ref<HTMLDivElement>
    const ready = ref(false)
    const mitter = mitt() as Mitter
    const vditorRef = shallowRef<Vditor>()
    const isTextareaFocus = ref(false)

    provide('vkVditorMitter', mitter)
    provide('vkVditorRef', vditorRef)

    onMounted(() => {
      const vditor = new Vditor(vditorNode.value, {
        ...props.defaultOptions,
        placeholder: props.placeholder,
        
        cache: {
          enable: true,
          id: 'VkVditorCache',
          ...(props.defaultOptions.cache || {}),
        },
        after () {
          vditorRef.value = vditor
          ready.value = true
          emit('load', vditor)
          props.defaultOptions.after?.()
        },
        input (value) {
          mitter.emit('input', value)
          props.defaultOptions.input?.(value)
        },

        ctrlEnter (value) {
          emit('update:modelValue', value)
          emit('ctrlEnter', value)
        },

        focus (v) {
          isTextareaFocus.value = true
          props.defaultOptions.focus?.(v)
        },

        blur (v) {
          isTextareaFocus.value = false
          props.defaultOptions.blur?.(v)
        },

        toolbar: props.toolbar,
  
      })
    })


    return {
      vditorNode,
      isTextareaFocus,
      ready,
      
    }
  },
})
</script>
<template>
  <div ref="vditorNode" class="vkf-vditor"></div>

  <VkAsyncTeleport v-if="ready" :to="vditorNode">
    <div
      class="vkf-vditor-footer"
      :class="{
        'is-textarea-focus': isTextareaFocus,
      }"
    >
      <slot name="footer"></slot>
    </div>
  </VkAsyncTeleport>
  
  <HandleValue
    v-if="ready"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  ></HandleValue>
  <HandleFullscreen
    v-if="ready"
    :fullscreen="fullscreen"
    @update:fullscreen="$emit('update:fullscreen', $event)"
  >
  </HandleFullscreen>

  <slot v-if="ready"></slot>
</template>

<style>
.vkf-vditor ul li {
  list-style: initial;
}
.vkf-vditor ol li {
  list-style: decimal;
}
.vkf-vditor.vditor{
  --textarea-background-color: var(--el-fill-color-extra-light);
}
.vkf-vditor-footer.is-textarea-focus{
  background-color:  var(--textarea-background-color);
}
</style>