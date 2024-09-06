<script setup lang="ts">
import { PropType, Ref, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { MenuItem, getAbsoluteTop } from '../composables/outline'
import VPDocOutlineItem from './VPDocOutlineItem.vue'
import { VkCheckLogicProvider } from '@vunk/core'
import { VkFloatBlock } from '@vunk/gsap'
import { useReloaded, useUpdating } from '@vunk/core/composables'
import { throttle } from 'lodash-es'
import { sleep } from '@vunk/core/shared/utils-promise'


const props = defineProps({
  headers: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
})

const throttleSetCurrentLinkByScroll = throttle(setCurrentLinkByScroll, 400)

const reloaded = useReloaded(() => props.headers)
const container = ref()

const currentLink = ref('')
const updatingLinkByClick = useUpdating(() => sleep(1000))


// scrollbar > scrollwrap > scrollview
const scrollviewNode = shallowRef() as Ref<HTMLElement>

onMounted(() => {
  scrollviewNode.value = document.getElementById('VPScrollView') as HTMLElement
  const scrollwrap = scrollviewNode.value.parentElement as HTMLDivElement

  scrollwrap.addEventListener('scroll', throttleSetCurrentLinkByScroll)
  onUnmounted(() => {
    scrollwrap.removeEventListener('scroll', throttleSetCurrentLinkByScroll)
  })
})

const linkClick = (link: string) => {
  currentLink.value = link  
  updatingLinkByClick.value = true
}


function setCurrentLinkByScroll () {
  if (updatingLinkByClick.value) return
  const scrollview = scrollviewNode.value
  const scrollwrap = scrollview.parentElement as HTMLDivElement
  const scrollbar = scrollwrap.parentElement as HTMLDivElement
  if (!scrollbar) return

  const scrollY = scrollwrap.scrollTop

  const isBottom = scrollY + scrollwrap.clientHeight >= scrollwrap.scrollHeight

  if (scrollY < 1) {
    currentLink.value = ''
    return
  }

  if (isBottom) {
    currentLink.value = props.headers[props.headers.length - 1].link
    return
  }


  const linkTops = props.headers.map(item => {
    return {
      link: item.link,
      top: getAbsoluteTop(item.element, scrollbar),
    }
  }).filter(({ top }) => !Number.isNaN(top))
    .sort((a, b) => a.top - b.top)

  // find the last header above the top of scrollwrap
  for (const { link, top } of linkTops) {
    if (top > scrollY) {
      currentLink.value = link
      return
    }
  }

}


</script>

<template>
  <div
    ref="container"
    class="VPDocAsideOutline"
    :class="{ 'has-outline': true }"
    role="navigation"
  >
    <div class="content">
      <nav aria-labelledby="doc-outline-aria-label">
        <span
          id="doc-outline-aria-label"
          class="visually-hidden"
        >
          Table of Contents for current page
        </span>
        <VkCheckLogicProvider v-model="currentLink">
          <div class="vp-doc-outline-x">
            <VPDocOutlineItem
              :headers="headers"
              :root="true"
              @link-click="linkClick"
            />

            <VkFloatBlock 
              v-if="reloaded"
              :scale="0.8"
              :type="'column'"
              :item-class="'outline-link'"
            ></VkFloatBlock>
          </div>
        </VkCheckLogicProvider>
      </nav>
    </div>
  </div>
</template>

<style scoped>

.vp-doc-outline-x{
  position: relative;
   --vk-float-block-color: var(--el-color-primary);
}
.VPDocAsideOutline {
  display: none;
}

.VPDocAsideOutline.has-outline {
  display: block;
}

.content {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  /* padding-left: 16px; */
  margin-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 2px;
  border-radius: 2px;
  height: 18px;
  background-color: var(--vp-c-brand-1);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}
</style>
