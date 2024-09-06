import { CrowdinFileLangOptions } from './crowdin'
import { PageContext } from 'vike/types'

export default lang

function lang (pageContext: PageContext) {
  const { urlPathname } = pageContext
  //  urlPathname "/zh-CN/component/view"
  const urlPaths = urlPathname.split('/')

  const mightBeLang = urlPaths[1]
  let locale = 'zh-CN'
  CrowdinFileLangOptions.some((langMedia) => {
    if (langMedia.value === mightBeLang) {
      locale = mightBeLang
      return true
    }
  })

  return locale
}

