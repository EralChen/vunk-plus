import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import fg from 'fast-glob'
import { libExternal } from '@lib-env/build-constants'
import { replaceLibAlias } from '@lib-env/build-utils'

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
      VueMacros({
        plugins: {
          vue: vue({
            template: {
              compilerOptions: {
                isCustomElement: (tag: string) => false,
              },
            },
            script: {
              fs: {
                fileExists: (file: string) => {
                  try { fs.accessSync(file); return true } catch { return false }
                },
                readFile: (file: string) => fs.readFileSync(file, 'utf-8'),
              },
            },
          }),
          vueJsx: vueJsx(),
        },
      }),
      replaceLibAlias(),
    ],
  } as UserConfig
})

function getBuildLibEntry() {
  return fg.sync('index.ts', {
    cwd: __dirname,
    onlyFiles: true,
    ignore: ['node_modules/**', 'dist/**'],
  })
}