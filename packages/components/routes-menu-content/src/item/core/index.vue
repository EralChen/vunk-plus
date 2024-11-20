<script lang="ts">
import { resolveFullPath } from '@vunk/shared/string/url'
import { ElSubMenu, ElMenuItem } from 'element-plus'
import { computed, defineComponent } from 'vue'
import { props } from './ctx'
export default defineComponent({
  components: {
    ElSubMenu,
    ElMenuItem,
  },
  props,
  setup (props) {
    const hasChildren = computed(() => {
      let flag = false
      if (props.data.children) {
        flag = props.data.children.some((item) => {
          return item.meta?.display != 0 && item.meta?.hidden !== true
        })
      }
      return flag
    })

    const subMenuIndex = computed(() => {
      const meta = props.data.meta
      return meta?.subMenuIndex
        ? meta.subMenuIndex as string
        : resolveFullPath(props.data.path, props.basePath)
    })
    return {
      resolveFullPath,
      hasChildren,
      subMenuIndex,
    }
  },
})
</script>
<template>
  <ElSubMenu 
    v-if="hasChildren" 
    :index="subMenuIndex"
    :popper-class="popperClass"
  >
    <template #title>
      <slot
        name="menuTitle"
        :data="data"
        :href="resolveFullPath(data.path, basePath)"
        :base-path="basePath"
      >
      </slot>
    </template>
    <slot></slot>
  </ElSubMenu>

  <ElMenuItem
    v-else
    :index="resolveFullPath(data.path, basePath)"
  >
    <template #title>
      <slot 
        name="itemTitle" 
        :data="data"
        :href="resolveFullPath(data.path, basePath)"
        :base-path="basePath"
      ></slot>
    </template>

    <slot
      name="item"
      :data="data"
      :href="resolveFullPath(data.path, basePath)"
      :base-path="basePath"
    ></slot>
  </ElMenuItem>
</template>
