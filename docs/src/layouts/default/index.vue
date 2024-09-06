<script lang="ts" setup>
import { VkDuplex } from '@vunk/core'
import { ElScrollbar } from 'element-plus'
import Navbar from './navbar.vue'
import Aside from './aside.vue'
import Toc from './toc.vue'
import { nextTick, ref, shallowRef } from 'vue'
import { onContentUpdated } from '@vunk/shared/vike/vue/hooks'
import type { PageContext } from 'vike/types'
import { ArrowLeft } from '@element-plus/icons-vue'
import { VkCollapseTransitionHorizontal } from '@vunk/core/components/collapse-transition-horizontal'

const scrollbarNode = shallowRef<InstanceType<typeof ElScrollbar>>()

const currentScrollTopCache = {} as Record<string, number>

const currentPath = shallowRef('')

onContentUpdated((ctx: PageContext) => {
  currentPath.value = ctx.urlOriginal

  if (ctx.urlParsed.hash) {
    return
  }

  nextTick(() => {
    scrollbarNode.value?.setScrollTop(
      currentScrollTopCache[currentPath.value] ?? 0,
    )
  })

}, {
  hooks: ['mounted'],
})

onContentUpdated(() => {
  currentScrollTopCache[currentPath.value] = scrollbarNode.value?.wrapRef?.scrollTop ?? 0
}, {
  hooks: ['beforeUnmount'],
})

/* aside 收起 */
const asideCollapsed = ref(false)
const asideToggle = () => {
  asideCollapsed.value = !asideCollapsed.value
}
/* end of aside 收起 */
</script>
<template>
  <VkDuplex class="layout-default">
    <template #one>
      <div class="layout-default-header">
        <Navbar></Navbar>
      </div>
    </template>

    <div
      sk-flex
      class="h-100% relative"
    >
      <div class="layout-default-aside-x bg-bg-base" sk-flex>
        <VkCollapseTransitionHorizontal>
          <div
            v-show="!asideCollapsed" class="layout-default-aside"
            :class="{
              'is-collapsed': asideCollapsed,
            }"
          >
            <Aside></Aside>
          </div>
        </VkCollapseTransitionHorizontal>
     
        <div 
          bg-fill-light
          border-r-1
          border-l-1
          border-t-0
          border-b-0
          border-solid
          border-color-border-base
          cursor-pointer
          sk-flex="col-center2"
          @click="asideToggle"
        >
          <ElIcon
            :class="{
              'rotate-180': asideCollapsed,
              'transition-transform': true,
            }"
          >
            <ArrowLeft></ArrowLeft>
          </ElIcon>
        </div>
      </div>

      <VkDuplex 
        class="flex-1 overflow-hidden"
      >
        <ElScrollbar
          id="VPScrollView"
          ref="scrollbarNode"
        >
          <main class="page-content">
            <div class="doc-content-wrapper">
              <div
                id="VPContent"
                class="doc-content-container"
              >
                <slot></slot>
              </div>
              <div class="doc-toc-container">
                <Toc></Toc>
              </div>
            </div>     
          </main>
        </ElScrollbar>
      </VkDuplex>
    </div>
  </VkDuplex>
</template>

<style>
html{
  height: 100%;
}
body, #app, #page-view {
  height: inherit;
}

</style>

<style>
.doc-toc-container{
  width: 300px;
  position: sticky;
  top: 0;
  height: 100%;
  overflow: auto;
  padding: var(--gap-page);
  background-color: var(--bg-color);
}
.doc-content-container{
  flex-grow: 1;
}
.layout-default {
  --layout-aside-width: 300px;
}

.layout-default > .vk-duplex-2 {
  background-color: var(--bg-color);

}
.layout-default-header{
  height: 60px;
  border-bottom: var(--el-border-color) 1px solid;
}
.layout-default-aside{
  /* min-width: var(--layout-aside-width); */
  height: 100%;
}

.layout-default-aside.is-collapsed{
  min-width: 0;
}

</style>


<style>
.layout-default-aside-x,
.layout-default {
  height: 100%;
}

.layout-default-main {
  width: 100%;
}
</style>

<style>
/* 手机尺寸下 */
@media screen and (max-width: 768px){
  .layout-default-aside-x{
    position: absolute;
    z-index: 5;
  }
}

</style>