import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({

  build: {
    lib: {
      entry: {
        'shared/audioToFrames/index': resolve(__dirname, './audioToFrames/index.ts'),
        'shared/types/index': resolve(__dirname, './types/index.ts'),
      },
      name: 'index',
    },
    assetsDir: '',
    rollupOptions: {
      external: [
        'vue',
        'onnxruntime-web',
        /^@vunk\/shared/,
      ],
    },
  },
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
