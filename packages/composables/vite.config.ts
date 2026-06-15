import { defineConfig, type UserConfig } from 'vite'
import fg from 'fast-glob'
import path from 'node:path'
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
          'consola',
        ],
        output: {
          exports: 'named',
        },
      },
    },
    plugins: [
      replaceLibAlias(),
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
