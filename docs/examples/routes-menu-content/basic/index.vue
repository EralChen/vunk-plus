<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
import type { RouteRecordRaw } from 'vue-router'
import { VkRoutesMenuContent } from '@vunk-plus/components/routes-menu-content'

const constRoutes = [
  {
    path: '/ui',
    name: 'ui',

    children: [
      {
        path: 'menu',
        name: 'menu',
        children: [{
          path: 'subItem1',
          name: 'subItem1',
   
          children: [
            {
              path: 'subItem1-1',
              name: 'subItem1-1',
      
            },
            {
              path: 'subItem1-2',
              name: 'subItem1-1',
    
            },
          ],
        }],
      },
    ],
  },
] as unknown as RouteRecordRaw[]
</script>
<template>
  <ElMenu :collapse="false">
    <VkRoutesMenuContent 
      :data="constRoutes" :popper-class="'vk-routes-menu-content-popper'"
    >
      <template #item>
        <ElIcon><Document></Document></ElIcon>
      </template>
      
      <template #itemTitle="{data, href}">
        {{ data.meta?.name || data.name }}
        href: {{ href }}
      </template>

      <template #menuTitle="{ data }">
        <ElIcon><Document></Document></ElIcon>
        {{ data.meta?.name || data.name }}
      </template>
    </VkRoutesMenuContent>
  </ElMenu>
</template>
