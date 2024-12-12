<script lang="ts" setup>
import type { PageContext } from 'vike/types'
import IconExpand from '#s/components/icon-expand/index.vue'
import IconFold from '#s/components/icon-fold/index.vue'
import IconSearch from '#s/components/icon-search/index.vue'
import { VkDuplex } from '@vunk/core'
import { VkCollapseTransitionHorizontal } from '@vunk/core/components/collapse-transition-horizontal'
import { onContentUpdated } from '@vunk/shared/vike/vue/hooks'
import { ElScrollbar } from 'element-plus'
import { nextTick, ref, shallowRef } from 'vue'
import Aside from './aside.vue'
import Navbar from './navbar.vue'
import Toc from './toc.vue'

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

/* Collapsed */
const asideCollapsed = ref(false)
const searchCollapsed = ref(true)
function searchCollapsedToggle () {
  searchCollapsed.value = !searchCollapsed.value
}
/* endof Collapsed */
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
      <div class="layout-default-aside-x bg-bg-base">
        <VkCollapseTransitionHorizontal>
          <VkDuplex
            v-show="!asideCollapsed" class="layout-default-aside"
            :class="{
              'is-collapsed': asideCollapsed,
            }"
            gap="var(--gap-m)"
          >
            <template #one>
              <div
                class="page-agent-main-top-options"
                sk-flex="row-between-center"
                mlr-m
                mt-m
              >
                <IconFold
                  @click="asideCollapsed = true"
                ></IconFold>

                <IconSearch
                  @click="searchCollapsedToggle"
                ></IconSearch>
              </div>
            </template>

            <Aside :search="!searchCollapsed"></Aside>
          </VkDuplex>
        </VkCollapseTransitionHorizontal>
      </div>

      <VkDuplex
        class="flex-1 overflow-hidden"
      >
        <ElScrollbar
          id="VPScrollView"
          ref="scrollbarNode"
        >
          <main class="page-content">
            <div v-show="asideCollapsed" position-absolute pt-m pl-m>
              <IconExpand
                @click="asideCollapsed = false"
              ></IconExpand>
            </div>

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

/* 手机尺寸下 */
@media screen and (max-width: 768px){
  .layout-default-aside-x{
    position: absolute;
    z-index: 5;
  }
}
</style>
