<script lang="ts">
import { props, emits } from './ctx'
import { defineComponent } from 'vue'
import ItemVue from './item/index.vue'
import { resolveFullPath } from '@vunk/shared/string/url'
export default defineComponent({
  name: 'VkRoutesMenuContent',
  components: {
    ItemVue,
  },
  props,
  emits,
  setup () {
    return {
      resolveFullPath,
    }
  },
})
</script>
<template>
  <ItemVue 
    v-for="item of data" 
    :key="(item.name || item.path)"
    :data="item" 
    :popper-class="popperClass"
    :base-path="basePath"
  >
    <VkRoutesMenuContent 
      :data="item.children" 
      :popper-class="popperClass" 
      :base-path="resolveFullPath(item.path, basePath)"
    >
      <template #item="e">
        <slot
          name="item"
          v-bind="e"
        ></slot>
      </template>
      <template #menuTitle="e">
        <slot
          name="menuTitle"
          v-bind="e"
        ></slot>
      </template>
      <template #itemTitle="e">
        <slot
          name="itemTitle"
          v-bind="e"
        ></slot>
      </template>
    </VkRoutesMenuContent>

 
    <template #item="e">
      <slot
        name="item"
        v-bind="e"
      ></slot>
    </template>
    <template #menuTitle="e">
      <slot
        name="menuTitle"
        v-bind="e"
      ></slot>
    </template>
    <template #itemTitle="e">
      <slot
        name="itemTitle"
        v-bind="e"
      ></slot>
    </template>
  </ItemVue>
</template>
