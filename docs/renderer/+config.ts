import defaultConfig from '@vunk/shared/vike/vue/config'

export default {
  ...defaultConfig,

  onRenderClient: 'import:@vunk/shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: 'import:@vunk/shared/vike/vue/onRenderHtml:onRenderHtml',

  passToClient: [
    ...defaultConfig.passToClient,
    'crowdin',
  ],
  clientRouting: true,
  hydrationCanBeAborted: true,
}
