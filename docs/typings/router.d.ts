/* 扩展 RouteMeta */
import *  as Icons from '@element-plus/icons-vue'
declare module 'vue-router' {

  interface RouteMeta {
    /**
     * 标题
     */
    title?: string
    
    /**
     * 图标
     */
    icon?: keyof typeof Icons 
    /**
     * 是否一直显示，不会收到路由合并的影响
     */
    alwaysShow?: boolean

    /**
     * 是否隐藏
     */
    hidden?: boolean


    /**
     * ElSubMenu prop: index
     */
    subMenuIndex?: string
  
  }
}

export {}
