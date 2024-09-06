import { PageContext } from 'vike/types'
import { CrowdinFileLang, rCrowdinFilesAsReflect } from './crowdin'
import { getHeadSetting } from '@vunk/shared/vike'

export async function onBeforeRenderHtml (pageContext: PageContext) {
  const lang = getHeadSetting('lang', pageContext)
  pageContext.crowdin = await rCrowdinFilesAsReflect(lang as CrowdinFileLang)
}
