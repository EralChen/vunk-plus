<script setup lang="ts">
import type { MenuItem } from '../composables/outline'
import { VkCheckLogic } from '@vunk/core'

defineOptions({
  name: 'VPDocOutlineItem',
})

defineProps<{
  headers: MenuItem[]
  root?: boolean
}>()

const emit = defineEmits({
  linkClick: (link: string) => typeof link === 'string',
})

function onClick ({ target: el }: Event) {
  const id = (el as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))
  heading?.focus({ preventScroll: true })

  emit('linkClick', `#${decodeURIComponent(id)}`)
}
</script>

<template>
  <ul
    class="VPDocOutlineItem toc-items"
    :class="root ? 'root' : 'nested'"
  >
    <li
      v-for="{ children, link, title } in headers"
      :key="link"
      class="toc-item"
    >
      <VkCheckLogic
        :name="link"
        :custom="true"
      >
        <template #default="{ isActive }">
          <a
            class="outline-link toc-link subitem"
            :class="{ 'is-active': isActive }"
            :href="link"
            :title="title"
            @click="onClick"
          >
            {{ title }}
          </a>
        </template>
      </VkCheckLogic>

      <template v-if="children?.length">
        <VPDocOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-right: 16px;
  padding-left: 16px;
}

.outline-link {
  display: block;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.outline-link.nested {
  padding-left: 13px;
}
</style>
