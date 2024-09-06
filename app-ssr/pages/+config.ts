import vikeVue from 'vike-vue/config'
import type { Config } from 'vike/types'
import Head from '../client/layouts/HeadDefault.vue'
import Layout from '../client/layouts/LayoutDefault.vue'

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: 'My Vike App',
  extends: [vikeVue],
  passToClient: [
    'crowdin',
  ],
} satisfies Config
