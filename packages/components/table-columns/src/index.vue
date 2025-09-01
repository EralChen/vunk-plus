<script lang="ts">
import type { NormalObject } from '@vunk/shared'
import type { VNode } from 'vue'
import type { Source } from './types'
import { isPlainObject, pickObject } from '@vunk/shared/object'
import { ElTableColumn } from 'element-plus'
import { defineComponent, h, unref } from 'vue'
import { props } from './ctx'
import { createTableColumnBindProps } from './el-ctx'

export default defineComponent({
  name: 'VkTableColumns',
  components: {
    ElTableColumn: ElTableColumn as never,
  },
  props,
  setup (props) {
    const coreBindProps = createTableColumnBindProps(props)
    return () => {
      const createCols = (source = props.source) => {
        return source.reduce((a, item: Source) => {
          const hidden = unref(item.hidden)
          if (hidden) {
            return a
          }
          let slots: NormalObject = {}
          if (isPlainObject(item.slots)) {
            slots = item.slots as NormalObject
          }
          if (typeof item.slots === 'function') {
            slots.default = item.slots
          }
          if (item.children) {
            slots.default = () => createCols(item.children)
          }

          const attr = {
            key: item.prop,
            ...coreBindProps.value,
            ...pickObject(item, {
              excludes: ['children', 'slots'],
            }),
          }

          // 删除 attr 中的 falsy 值
          Object.keys(attr).forEach((key) => {
            if (
              attr[key] === undefined
              || attr[key] === null
              || attr[key] === ''
            ) {
              Reflect.deleteProperty(attr, key)
            }
          })

          a.push(h(ElTableColumn, attr, slots))
          return a
        }, [] as VNode[])
      }
      return createCols(props.source)
    }
  },
})
</script>
