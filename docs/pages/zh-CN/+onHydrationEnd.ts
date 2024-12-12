import type { PageContext } from 'vike/types'
import { navigate } from 'vike/client/router'

export async function onHydrationEnd (pageContext: PageContext) {
  const { urlOriginal } = pageContext
  if (urlOriginal.endsWith('/')) { // clean up trailing slash
    navigate(urlOriginal.slice(0, -1))
  }
}
