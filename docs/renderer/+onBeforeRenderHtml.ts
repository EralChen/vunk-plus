import type { PageContext } from 'vike/types'
import type { CrowdinFileLang } from '../shared'
import { getHeadSetting } from '@vunk/shared/vike'
import { rCrowdinFilesAsReflect } from './crowdin'

export async function onBeforeRenderHtml (
  pageContext: PageContext,
) {
  const lang = getHeadSetting('lang', pageContext)
  pageContext.crowdin = await rCrowdinFilesAsReflect(lang as CrowdinFileLang)
}
