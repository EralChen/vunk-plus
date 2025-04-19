import type { RouteRecordRaw } from 'vue-router'
import { SplitGrid } from '@/layouts/split-grid/index'
import { createRouter, createWebHashHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/chat',
    children: [
      {
        path: ':accessToken',
        props: true,
        component: () => import('_v/chat/index.vue'),
      },
    ],

  },
]

const router = createRouter({
  history: createWebHashHistory(`${import.meta.env.VITE_BASE_URL}/`),
  routes,
})

export default router
