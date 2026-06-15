import { defineConfig, type UserConfig } from 'vite'
import path from 'node:path'
import { libExternal, LIB_ENTRY_FLIENAME } from '@lib-env/build-constants'
import { replaceLibAlias } from '@lib-env/build-utils'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, `./${LIB_ENTRY_FLIENAME}.ts`),
        formats: ['es'],
        fileName: () => 'index.esm.js',
      },
      emptyOutDir: false,
      rollupOptions: {
        external: libExternal,
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
