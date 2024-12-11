<script lang="ts" setup>
import type { CrowdinFile, MenuRaw } from '#/shared'
import type { Ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { CrowdinFilePath, useCrowdinFile } from '#s/composables/crowdin'
import { SkAppIcon } from '@skzz/platform/components/app-icon'
import { VkDuplex } from '@vunk/core'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import { findDeep } from 'deepdash-es/standalone'
import { ElCollapseTransition, ElMenu } from 'element-plus'
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue'

defineProps({
  search: {
    type: Boolean,
    default: true,
  },
})

const menuComponent = ref() as Ref<{
  open: (index: string) => void
}>

const componentCrow = useCrowdinFile(CrowdinFilePath.component)
const guideCrow = useCrowdinFile(CrowdinFilePath.guide)
const crow: Record<string, CrowdinFile> = {
  component: componentCrow,
  guide: guideCrow,
}

const basePath = import.meta.env.BASE_URL + componentCrow.lang
const pathname = shallowRef('')
onMounted(() => {
  pathname.value = window.location.pathname
  // 同步 pathname
  setInterval(() => {
    pathname.value = window.location.pathname
  }, 400)
})

const currentCrowname = computed(() => {
  if (!pathname.value)
    return
  const current = pathname.value.replace(basePath, '')
  const name = current.split('/').filter(Boolean).shift()
  return name
})
const currentCrow = computed<CrowdinFile | undefined>(() => {
  if (!currentCrowname.value)
    return
  return crow[currentCrowname.value]
})

/* menu source */
const source = computed(() => currentCrow.value?.source ?? {})
const menu = computed(() => {
  return genRoutes(
    Object.values(source.value),
    `${basePath}/${currentCrowname.value}`,
  )
})
function genRoutes (menus: MenuRaw[], parentPath = basePath): RouteRecordRaw[] {
  return menus.map((menu) => {
    const path = parentPath + (menu.link ?? '')
    const meta: NonNullable<RouteRecordRaw['meta']> = {
      title: menu.text,
      alwaysShow: true,
    }

    if (menu.children?.length) { // 如果是父级菜单, 以第一个子菜单为默认 Index
      meta.subMenuIndex = path + menu.children[0].link
    }

    const route = {
      path,
      meta,
      name: menu.text,
      children: genRoutes(menu.children ?? [], path),
    } as RouteRecordRaw
    return route
  })
}
/* end of menu source */

/* menu event */
const filterTitle = ref('')
function includesTitle (route: RouteRecordRaw) {
  return !!route.meta?.title
    ?.toLocaleLowerCase()
    .includes(filterTitle.value.toLocaleLowerCase())
}

// 根据标题过滤菜单
const filterMenu = computed(() => {
  if (!filterTitle.value) {
    return menu.value
  }
  function genRoutes (routes: RouteRecordRaw[]) {
    return routes.reduce((a, route) => {
      // 如果匹配到当前路由，则所有子路由都显示
      if (includesTitle(route)) {
        a.push(route)
      }
      else if (route.children?.length) { // 检索当前子路由
        const children = genRoutes(route.children)
        if (children.length) {
          nextTick(() => {
            if (route.meta?.subMenuIndex) {
              menuComponent.value?.open(route.meta.subMenuIndex)
            }
          })

          a.push({
            ...route,
            children,
          })
        }
      }
      return a
    }, [] as RouteRecordRaw[])
  }
  return genRoutes(menu.value)
})
onMounted(() => {
  pathname.value = window.location.pathname
  initOpenMenu()
})
function initOpenMenu () {
  // const testIndex = route.matched.map(item => item.path)
  const pathname = window.location.pathname
  findDeep(filterMenu.value, (v, k, _, { parents }) => {
    if (k === 'path' && pathname === v) {
      // console.log(parents)
      // 从后往前[非自身]找到第一个有 subMenuIndex 的父级
      if (!parents)
        return true

      for (let i = parents.length - 2; i >= 0; i--) {
        const parent = parents[i]
        if (parent.value.meta?.subMenuIndex) {
          nextTick(() => {
            menuComponent.value?.open(parent.value.meta.subMenuIndex)
          })
          break
        }
      }

      return true
    }
  })
}
/* end of menu event   */
</script>

<template>
  <VkDuplex class="h-full">
    <template #one>
      <ElInput
        v-show="search"
        v-model="filterTitle"
        form=""
        size="large"
        class="layout-default-aside-search"
        placeholder="搜索组件"
      ></ElInput>
    </template>
    <template #two>
      <ElScrollbar>
        <ElMenu
          ref="menuComponent"
          class="layout-default-aside-menu"
          :default-active="pathname"
        >
          <VkRoutesMenuContent
            :data="filterMenu"
            :base-path="basePath"
          >
            <template #item="{ href, data }">
              <a
                :href="href"
                class="layout-default-aside-menu-a"
                :title="data.meta?.title"
              >
                <ElIcon>
                  <SkAppIcon
                    v-if="data.meta?.icon"
                    :icon="data.meta.icon"
                  />
                </ElIcon>
              </a>
            </template>

            <template #itemTitle="{ data }">
              <span
                class="layout-default-aside-menu-title"
              > {{ data.meta?.title }} </span>
            </template>

            <template #menuTitle="{ data }">
              {{ data.meta?.title }}
            </template>
          </VkRoutesMenuContent>
        </ElMenu>
      </ElScrollbar>
    </template>
  </VkDuplex>
</template>

<style>
.layout-default-aside-menu-title{
  /* 超出 省略 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.layout-default-aside-menu-a{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--el-color-primary);
}

.layout-default-aside-search{
  margin-top: var(--gap-xxs);
}

.layout-default-aside-search .el-input__wrapper{
  border-radius: 0;
  box-shadow: none;
}

.el-icon:empty{
  display: none;
}
.layout-default-aside-menu.layout-default-aside-menu {
  border-right: none;
  box-sizing: content-box;
  padding-right: 0.5em;
}

.layout-default-aside-menu[style*="--el-menu-level: 0"]>li {
  font-weight: bold;
}

.layout-default-aside-menu[style*="--el-menu-level:0"]>li {
  font-weight: bold;
}

.layout-default-aside-menu[style*="--el-menu-level: 0"]>li>ul {
  font-weight: initial;
}
.layout-default-aside-menu[style*="--el-menu-level:0"]>li>ul {
  font-weight: initial;
}

.layout-default-aside-collapse {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
  cursor: pointer;
  z-index: 2;
}

.layout-default-aside {
  position: relative;
}

.layout-default-aside-menu:not(.el-menu--collapse) {
  width: var(--layout-aside-width);
}

.layout-default-aside-menu {
  min-height: var(--vk-duplex-calc-resize-height);
}

.layout-default-aside-item-icon {
  margin-bottom: .2em;
}

.layout-default-aside:hover .layout-default-aside-collapse {
  opacity: 1;
}

.layout-default-aside-collapse {
  opacity: 0;
  transition: opacity 3s cubic-bezier(.15, .84, 0, 1.06);
}
</style>
