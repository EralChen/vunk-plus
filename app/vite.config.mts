import type { UserConfig } from 'vite'
import path from 'node:path'
import { packagesDir } from '@lib-env/path'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { windowEnv } from '@vunk/shared/vite/plain'
import unocss from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import createExternal from 'vite-plugin-external'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueDevTools from 'vite-plugin-vue-devtools'
import { appRoot, srcRoot } from './path.config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
  return {
    base: `${env.VITE_BASE_URL}/`,
    build: {
      outDir: path.resolve(appRoot, `./dist${env.VITE_BASE_URL}`),
    },
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '_v': path.resolve(srcRoot, './views'),
        '_c': path.resolve(srcRoot, './components'),
        '@': path.resolve(srcRoot, '.'),
      },
    },

    plugins: [
      VueDevTools(),
      vue(),
      vueJSX(),

      windowEnv(),
      unocss(),
      // legacy({
      //   modernPolyfills: ['esnext.array.at'],
      // }),
      createExternal({
        externals: {
        },
      }),

      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [
          path.resolve(packagesDir, './icons/svg'),
          path.resolve(appRoot, './src/icons/svg'),
        ],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),

    ],

    css: { // https://www.cnblogs.com/crispyChicken/p/18420010
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },

  } as UserConfig
})
