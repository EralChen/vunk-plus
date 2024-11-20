<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { VkRoutesMenuContent } from '@vunk-plus/components/routes-menu-content'
import { Document } from '@element-plus/icons-vue'
import { RouteRecordRaw } from 'vue-router'

const constRoutes = [
  {
    path: '/ui',
    name: 'ui',
    meta: {
      title: 'UI',
    },
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
              meta: {
                title: 'subItem1-1',
              },
            },
            {
              path: 'subItem1-2',
              name: 'subItem1-1',
              meta: {
                title: 'subItem1-2',
              },
            },
          ],
        }],
      },
    ],
  },
] as unknown as RouteRecordRaw[]


</script>
<template>
  <ElMenu>
    <VkRoutesMenuContent 
      :data="constRoutes"
    >
      <template #item="{ data, href }">
        <a 
          :href="href" 
          class="demo-routes-menu-content-a"
          :title="data.meta?.title"
        >
          <ElIcon>
            <Document></Document>
          </ElIcon>
        </a>
      </template>

      <template #itemTitle="{ data }">
        <span>{{ data.meta?.title || data.meta?.name }}</span> 
      </template>

      <template #menuTitle="{ data }">
        <span>{{ data.meta?.title || data.meta?.name }}</span>
      </template>
    </VkRoutesMenuContent>
  </ElMenu>
</template>

<style>
.demo-routes-menu-content-a{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--el-color-primary);
}
</style>