import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fg from 'fast-glob'
import path from 'node:path'
import { libExternal } from '@lib-env/build-constants'

export default defineConfig(() => {
  const buildLibEntry = getBuildLibEntry()
  return {
    build: {
      outDir: 'dist',
      lib: {
        entry: buildLibEntry.reduce((entryObj, entry) => {
          const entryName = entry.includes('/')
            ? entry.replace(/\/index\.(ts|tsx)$/, '')
            : entry.replace(/\.(ts|tsx)$/, '')
          entryObj[entryName] = path.resolve(__dirname, entry)
          return entryObj
        }, {} as Record<string, string>),

        formats: ['es', 'cjs'],

        fileName(format, entryName) {
          const ext = format === 'es' ? 'mjs' : 'cjs'
          if (entryName === 'index') {
            return `index.${ext}`
          }
          return `${entryName}/index.${ext}`
        },
      },
      emptyOutDir: false,
      rollupOptions: {
        external: [
          ...libExternal,
          'lottie-web',
          'markdown-it',
          'markdown-it-async',
          /^monaco-editor/,
          'vditor',
          'ant-design-vue',
          'ant-design-x-vue',
          /^ant-design-x-vue/,
          '@ant-design/icons-vue',
          'vue-element-plus-x',
          /^recorder-core/,
          'xgplayer',
          'xgplayer-flv',
          'onnxruntime-web',
          'sophontalk-services',
          'pixi.js',
          'mitt',
          'howler',
          'consola',
          'vue-router',
          'vue-types',
          '@element-plus/icons-vue',
          '@sapphire/async-queue',
          '@vue/shared',
        ],
        output: {
          exports: 'named',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
        sass: {
          api: 'modern',
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
  } as UserConfig
})

function getBuildLibEntry() {
  return fg.sync('**/index.{ts,tsx}', {
    cwd: __dirname,
    onlyFiles: true,
    ignore: ['node_modules/**', 'dist/**'],
  })
}
