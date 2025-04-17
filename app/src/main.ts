import * as ElIconsVue from '@element-plus/icons-vue'
import { VkSvgIcon } from '@vunk/core'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

// 初始化 api 配置
import '@/api/init'

import 'virtual:svg-icons-register'
// import './permission'
import './styles'
import 'uno.css'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component('SvgIcon', VkSvgIcon)
  .mount('#app')

for (const [key, component] of Object.entries(ElIconsVue)) {
  app.component(key, component)
}
