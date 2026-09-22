import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { replaceLibAlias } from '@lib-env/build-utils'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'index.ts'),
        formats: ['es', 'cjs'],
        fileName(format) {
          return format === 'es' ? 'index.mjs' : 'index.cjs'
        },
      },
      emptyOutDir: false,
      rollupOptions: {
        external: [
          'vue',
        ],
        output: {
          exports: 'named',
        },
      },
    },
    plugins: [
      vue(),
      replaceLibAlias(),
    ],
    define: {
      VERSION: JSON.stringify('3.0.5'),
    },
  } as UserConfig
})