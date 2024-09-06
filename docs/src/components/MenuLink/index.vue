<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export default defineComponent({

  props: {
    data: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isMenu: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
  },
  setup () {
    return {
    }
  },
})
</script>
<template>
  <a 
    class="menu-link"
    :href="to"
  >
    {{ to }}
  </a>
</template>
<style>
.layout-default-aside-link {
  text-decoration: none;
  color: var(--el-menu-text-color);
}

.layout-default-aside-link.is-active {
  color: var(--el-menu-item-active-color);
}
</style>

