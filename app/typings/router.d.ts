/* 扩展 RouteMeta */
import type * as Icons from '@element-plus/icons-vue'

declare module 'vue-router' {

  interface RouteMeta {
    /**
     * 标题
     */
    title?: string

    /**
     * 图标
     */
    icon?: keyof typeof Icons | string
    /**
     * 是否一直显示，不会收到路由合并的影响
     */
    alwaysShow?: boolean

    /**
     * 是否隐藏
     */
    hidden?: boolean

    /**
     * 是否缓存
     * 0: 不缓存
     * 1: 缓存
     * 2: 自定义缓存策略
     */
    noCache?: 0 | 1 | 2

    /**
     * 控制当前路由是否出现在面包屑
     */
    breadcrumb?: boolean

    /**
     * 如果有路由被 header标记, 侧边菜单则仅展示该路由下的子路由
     */
    header?: boolean

    /**
     *  控制当前路由是否出现在标签页
     */
    tagsView?: boolean

    /**
     * 添加到标签页的主键
     * @default path
     */
    tagsViewBy?: 'path' | 'name'

  }
}

export {}
