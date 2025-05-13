<!-- MyCustomRendererTemplate.vue -->
<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { SetDataEvent } from '@vunk/core'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { markRaw } from 'vue'
import MyCustomTemplate from './MyCustomTemplate.vue'

// 处理组件实例引用
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

// 初始化渲染数据
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
  <!-- 注册自定义模板类型 -->
  <VkRendererTemplate type="MyCustomTemplate">
    <template #default="{ props, emitSetData }">
      <MyCustomTemplate
        :ref="(el) => setRef(emitSetData, props, el)"
        :content="props.content"
        @vue:mounted="initRenderData(emitSetData, props)"
      ></MyCustomTemplate>
    </template>
  </VkRendererTemplate>
</template>
