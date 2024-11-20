<script lang="ts">
import { computed, defineComponent } from 'vue'
import CoreVue from './core/index.vue'
import { props } from './ctx'
import { createBindProps } from './core/ctx'
import type { RouteRecordRaw } from 'vue-router'
const skipRender = Symbol('skipRender')

export default defineComponent({
  components: {
    CoreVue,
  },
  props,
  setup (props) {
    const bindProps = createBindProps(props)

    const onlyData = computed(() => {
      return getOnly(props.data)
    })


    function getOnly (data: RouteRecordRaw, merge: Partial<{
      paths: string[]
    }> = {}) {

      const children = data.children 
      const paths = merge.paths || [data.path]
      if (data.meta?.alwaysShow) return


      if (children) {
        const showChildren = children.filter((item) => (item.meta?.display != 0) && (item.meta?.hidden !== true))

        if (showChildren.length === 1) {
          const one = showChildren[0] 
          paths.push(one.path)

          // 将子路由作为当前主路由
          // 标记跳过 one 的渲染
          one[skipRender] = true

          if (one.children?.length) {
            
            const oneShowChildren = one.children.filter((item) => (item.meta?.display != 0) && (item.meta?.hidden !== true))

            if (oneShowChildren.length) {
              return getOnly(one, { paths })
            }
      
          }


          return {
            ...one,
            meta: {
              ...(data.meta ?? {}),
              ...(one.meta ?? {}),
            },
            _paths: paths,
            path: paths.reduce((prev, next) => {
              if (!prev) {
                return next
              }
              if (next.startsWith('/')) {
                return next
              } else {
                return prev + '/' + next
              }
            }, ''),
          }

        } 
      }

    }
    return {
      skipRender,
      onlyData,
      bindProps,
    }
  },
})
</script>
<template>
  <template v-if="(data.meta?.display != 0) && (data.meta?.hidden !== true)">
    <template v-if="!data[skipRender]">
      <CoreVue 
        v-if="onlyData"
        v-bind="bindProps"
        :data="onlyData"
      >
        <template #item="e">
          <slot
            name="item"
            v-bind="e"
          ></slot>
        </template>
          
        <template #menuTitle="e">
          <slot
            name="menuTitle"
            v-bind="e"
          ></slot>
        </template>

        <template #itemTitle="e">
          <slot
            name="itemTitle"
            v-bind="e"
          ></slot>
        </template>

        <slot></slot>
      </CoreVue>
      <CoreVue
        v-else
        v-bind="bindProps"
      >
        <template #item="e">
          <slot
            name="item"
            v-bind="e"
          ></slot>
        </template>
          
        <template #menuTitle="e">
          <slot
            name="menuTitle"
            v-bind="e"
          ></slot>
        </template>

        <template #itemTitle="e">
          <slot
            name="itemTitle"
            v-bind="e"
          ></slot>
        </template>
        
        <slot></slot>
      </CoreVue>
    </template>
    <slot v-else></slot>
  </template>
</template>
