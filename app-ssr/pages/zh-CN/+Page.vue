<script lang="ts" setup>
import { ref } from 'vue'
import { usePageContext } from 'vike-vue/usePageContext'
import { CrowdinFilePath } from '#/shared/crowdin'




const useCrowdinFile = (
  path: CrowdinFilePath,
) => {
  const pageContext = usePageContext()
  return pageContext.crowdin[path]
}


const { source } = useCrowdinFile(CrowdinFilePath.menus)
const data = ref('111')
</script>
<template>
  <div>{{ data }}</div>
  <div>{{ source }}</div>
</template>
