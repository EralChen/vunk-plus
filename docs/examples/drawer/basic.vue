<script lang="ts" setup>
import { VkDrawer } from '@vunk-plus/components/drawer'
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
</script>

<template>
  <div h-600px pos-relative>
    <ElSpace wrap>
      <ElButton @click="visible1 = true">
        基础用法（右侧）
      </ElButton>
      <ElButton @click="visible2 = true">
        左侧抽屉
      </ElButton>
      <ElButton @click="visible3 = true">
        自定义页签内容
      </ElButton>
      <ElButton @click="visible4 = true">
        页签始终可见
      </ElButton>
    </ElSpace>

    <!-- 基础用法 - 右侧抽屉 -->
    <VkDrawer
      v-model="visible1" title="右侧抽屉"
      :absolute="true"
      :modal="true"
      :modules="['toggle']"
    >
      <div p-4>
        <p>这是一个从右侧弹出的抽屉</p>
        <p>关闭抽屉后，右侧会显示一个切换页签</p>
        <p>点击页签可以重新打开抽屉</p>
        <p>页签会跟随抽屉的展开和收起动画移动</p>

        <p>这是一个从右侧弹出的抽屉</p>
        <p>关闭抽屉后，右侧会显示一个切换页签</p>
        <p>点击页签可以重新打开抽屉</p>
        <p>页签会跟随抽屉的展开和收起动画移动</p>
        <p>这是一个从右侧弹出的抽屉</p>
        <p>关闭抽屉后，右侧会显示一个切换页签</p>
        <p>点击页签可以重新打开抽屉</p>
        <p>页签会跟随抽屉的展开和收起动画移动</p>
        <p>这是一个从右侧弹出的抽屉</p>
        <p>关闭抽屉后，右侧会显示一个切换页签</p>
        <p>点击页签可以重新打开抽屉</p>
        <p>页签会跟随抽屉的展开和收起动画移动</p>
        <p>这是一个从右侧弹出的抽屉</p>
        <p>关闭抽屉后，右侧会显示一个切换页签</p>
        <p>点击页签可以重新打开抽屉</p>
        <p>页签会跟随抽屉的展开和收起动画移动</p>
      </div>
    </VkDrawer>

    <!-- 左侧抽屉 -->
    <VkDrawer
      v-model="visible2" title="左侧抽屉" direction="ltr"
      :modules="['toggle']"
    >
      <div p-4>
        <p>这是一个从左侧弹出的抽屉</p>
        <p>页签会自动显示在左侧边缘</p>
        <p>页签位置会根据抽屉的方向自动调整</p>
      </div>
    </VkDrawer>

    <!-- 自定义页签内容 -->
    <VkDrawer
      v-model="visible3"
      title="自定义页签"
      toggle-tab-content="菜单"
      :toggle-tab-size="50"
    >
      <template #toggle-tab>
        <div style="writing-mode: vertical-rl; font-size: 14px; color: #409eff;">
          📋 菜单
        </div>
      </template>
      <div p-4>
        <p>这个抽屉使用了自定义的页签内容</p>
        <p>你可以通过 toggle-tab 插槽自定义页签的显示</p>
        <p>也可以通过 toggleTabContent 属性设置文本内容</p>
        <p>通过 toggleTabSize 可以调整页签的大小</p>
      </div>
    </VkDrawer>

    <!-- 页签始终可见 -->
    <VkDrawer
      v-model="visible4"
      title="页签始终可见"
      :toggle-tab-always-visible="true"
    >
      <div p-4>
        <p>这个抽屉的页签始终可见</p>
        <p>即使抽屉打开时，页签也会显示在抽屉边缘</p>
        <p>适合需要快速切换的场景</p>
        <p>页签会紧贴抽屉边缘，不会固定在屏幕边缘</p>
      </div>
    </VkDrawer>
  </div>
</template>
