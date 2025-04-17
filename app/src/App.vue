<script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  name: 'App',
  data () {
    return {
      zhCn,
    }
  },
}
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
html {
  height: 100%;
}

body,
#app {
  height: inherit;
}
</style>
