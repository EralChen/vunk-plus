// https://vike.dev/onRenderHtml
export { onRenderHtml }

import { renderToNodeStream, renderToString } from 'vue/server-renderer'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'
import { getHeadSetting } from '#/vike-vue/renderer/getHeadSetting'
import type { OnRenderHtmlAsync, PageContext } from 'vike/types'
import { createVueApp } from './createVueApp'
import { App } from 'vue'

import '#s/styles'

import 'uno.css'
import { CrowdinFileLang, rCrowdinFilesAsReflect } from './crowdin'


const onRenderHtml: OnRenderHtmlAsync = async (pageContext):ReturnType<OnRenderHtmlAsync> => {
  const title = getHeadSetting('title', pageContext)
  const favicon = getHeadSetting('favicon', pageContext)
  const lang = getHeadSetting('lang', pageContext) || 'zh-CN'

  pageContext.crowdin = await rCrowdinFilesAsReflect(
    lang as CrowdinFileLang,
  )


  const titleTag = !title ? '' : escapeInject`<title>${title}</title>`
  const faviconTag = !favicon ? '' : escapeInject`<link rel="icon" href="${favicon}" />`

  let pageView: ReturnType<typeof dangerouslySkipEscape> | ReturnType<typeof renderToNodeStream> | string = ''
  const fromHtmlRenderer: PageContext['fromHtmlRenderer'] = {}

  if (!!pageContext.Page) {
    // SSR is enabled
    const ctxWithApp = await createVueApp(pageContext, true, 'Page')
    const { app } = ctxWithApp
    pageView = !pageContext.config.stream
      ? dangerouslySkipEscape(await renderToStringWithErrorHandling(app))
      : renderToNodeStreamWithErrorHandling(app)

    const pluginContexts = [
      pageContext.config.onAfterRenderSSRAppPinia?.(ctxWithApp),
      pageContext.config.onAfterRenderSSRAppVueQuery?.(ctxWithApp),
    ]
    Object.assign(fromHtmlRenderer, ...pluginContexts)

    // make sure user can override the context by assigning this last
    const userFromHtmlRenderer = await pageContext.config.onAfterRenderSSRApp?.(ctxWithApp)
    Object.assign(fromHtmlRenderer, userFromHtmlRenderer)
  }

  let headHtml: ReturnType<typeof dangerouslySkipEscape> | string = ''
  if (pageContext.config.Head) {
    const { app } = await createVueApp(pageContext, true, 'Head')
    headHtml = dangerouslySkipEscape(await renderToStringWithErrorHandling(app))
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${lang}'>
      <head>
        <meta charset="UTF-8" />
        ${titleTag}
        ${headHtml}
        ${faviconTag}
      </head>
      <body>
        <div id="vue-root">${pageView}</div>
      </body>
      <!-- built with https://github.com/vikejs/vike-vue -->
    </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
      fromHtmlRenderer,
    },
  }
}

async function renderToStringWithErrorHandling (app: App) {
  let returned = false
  let err: unknown
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    if (returned) {
      // eslint-disable-next-line no-console
      console.error(err_)
    } else {
      err = err_
    }
  }
  const appHtml = await renderToString(app)
  returned = true
  if (err) throw err
  return appHtml
}

function renderToNodeStreamWithErrorHandling (app: App) {
  let returned = false
  let err: unknown
  app.config.errorHandler = (err_) => {
    if (returned) {
      // eslint-disable-next-line no-console
      console.error(err_)
    } else {
      err = err_
    }
  }
  const appHtml = renderToNodeStream(app)
  returned = true
  if (err) throw err
  return appHtml
}

