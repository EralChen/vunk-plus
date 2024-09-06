import type { Config, ConfigEffect } from 'vike/types'


const toggleSsrRelatedConfig: ConfigEffect = ({ configDefinedAt, configValue }) => {
  if (typeof configValue !== 'boolean') {
    throw new Error(`${configDefinedAt} should be a boolean`)
  }

  return {
    meta: {
      // When the SSR flag is false, we want to render the page only in the
      // browser. We achieve this by then making the `Page` implementation
      // accessible only in the client's renderer.
      Page: {
        env: configValue
          ? { server: true, client: true } // default
          : { client: true },
      },
    },
  }
}


export default {

  onRenderClient: 'import:@vunk/shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: 'import:@vunk/shared/vike/vue/onRenderHtml:onRenderHtml',


  passToClient: ['fromHtmlRenderer', 'crowdin'],

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,

  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true },
    },
    Layout: {
      env: { server: true, client: true },
      cumulative: true,
    },
    title: {
      env: { server: true, client: true },
    },
    favicon: {
      env: { server: true, client: true },
    },
    lang: {
      env: { server: true, client: true },
    },
    ssr: {
      env: { config: true },
      effect: toggleSsrRelatedConfig,
    },
    stream: {
      env: { server: true },
    },
    // Deprecated (in favor of `onCreateApp()`). TODO/next-major-release: remove it.
    vuePlugins: {
      // List of vue plugins to be installed with app.vue() in onRenderHtml and
      // onRenderClient. We make this config available both on the server and
      // the client always, but if SSR is disabled, onRenderHtml won't make use
      // of it.
      env: { server: true, client: true },
    },
    onCreateApp: {
      env: { server: true, client: true },
      cumulative: true,
    },
    onAfterRenderHtml: {
      env: { server: true },
      cumulative: true,
    },
    onBeforeRenderClient: {
      env: { server: false, client: true },
      cumulative: true,
    },
    // Vike already defines the setting 'name', but we redundantly define it here for older Vike versions (otherwise older Vike versions will complain that 'name` is an unknown config). TODO/eventually: remove this once <=0.4.172 versions become rare (also because we use the `require` setting starting from `0.4.173`).
    name: {
      env: { config: true },
    },
    // Vike already defines the setting 'require', but we redundantly define it here for older Vike versions (otherwise older Vike versions will complain that 'require` is an unknown config). TODO/eventually: remove this once <=0.4.172 versions become rare (also because we use the `require` setting starting from `0.4.173`).
    require: {
      env: { config: true },
    },
    bodyHtmlBegin: {
      env: { server: true, client: true },
      cumulative: true,
    },
    bodyHtmlEnd: {
      env: { server: true, client: true },
      cumulative: true,
    },


    onBeforeRenderHtml: {
      env: { server: true, client: false },
      cumulative: true,
    },

  },
} satisfies Config



