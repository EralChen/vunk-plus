import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vike from 'vike/plugin'

import { AliasOptions, UserConfig, defineConfig, loadEnv } from 'vite'
import { appRoot, clientRoot } from './path.config'

import path from 'path'
import unocss from 'unocss/vite'


const alias: AliasOptions = [
  {
    find: '#',
    replacement: path.resolve(appRoot),
  },
  {
    find: '@',
    replacement: path.resolve(clientRoot),
  },
]


export default defineConfig(async ({ mode }) => {

  const env = loadEnv(mode, process.cwd()) as unknown as SsrMetaEnv
  const base = (env.VITE_BASE_URL ?? '') + '/'

  const config: UserConfig = {
    
    base,
    resolve: {
      alias,
    },
  
    ssr: {
      noExternal: [
        '@vuesri-core/**',
        '@arcgis/core/**',
        '@vunk/skzz/**',
        '@skzz/platform/**',
        'esri/**',
        '@vunk/gsap/**',
      ],
    },
    build: {
      target: ['esnext'],
    },
    
    plugins: [
      
      vike({

      }),

      unocss(),
      
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx({}),
    ],
    // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vike's CI
    optimizeDeps: { 
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true, 
        },
      },

    },
  }
  return config
})
