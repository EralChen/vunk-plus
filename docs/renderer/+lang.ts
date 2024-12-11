import type { PageContext } from 'vike/types'
import { crowdinFileLangOptions } from './crowdin'

export default lang

function lang (pageContext: PageContext) {
  const { urlPathname } = pageContext
  //  urlPathname "/zh-CN/component/view"
  const urlPaths = urlPathname.split('/')

  const mightBeLang = urlPaths[1]
  let locale = 'zh-CN'
  crowdinFileLangOptions.some((langMedia) => {
    if (langMedia.value === mightBeLang) {
      locale = mightBeLang
      return true
    }
  })

  return locale
}
