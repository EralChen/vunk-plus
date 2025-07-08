import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vike from 'vike/plugin'
import { AliasOptions, UserConfig, defineConfig, loadEnv } from 'vite'
import { appRoot, srcRoot } from './path.config'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { workRoot } from '@lib-env/path'
import { fixPath } from '@lib-env/build-utils'
import { createMarkdownPlugin } from '@vunk/shared/vite/markdown'
import unocss from 'unocss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'


const alias: AliasOptions = [
  {
    find: '#s',
    replacement: srcRoot,
  },
  {
    find: '#r',
    replacement: path.resolve(appRoot, './renderer'),
  },
  {
    find: '#p',
    replacement: path.resolve(appRoot, './pages'),
  },
  {
    find: '#e',
    replacement: path.resolve(appRoot, './examples'),
  },
  {
    find: '#',
    replacement: path.resolve(appRoot),
  },
]

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
  const base = `${env.VITE_BASE_URL}/`

  const config: UserConfig = {

    base,
    resolve: {
      alias,
    },

    server: {
      port: 9995,

      proxy: {
        '/api': {
          // target: 'http://192.168.111.245:9091',
          target: 'https://llm.geosophon.com',
          changeOrigin: true,
          rewrite: path => path.replace(env.VITE_BASE_PATH, '/'),
        },
      },
    },
    ssr: {
      noExternal: [
        '@vuesri-core/**',
        '@arcgis/core/**',
        '@vunk/skzz/**',
        'esri/**',
        '@vunk/gsap/**',
      ],

    },
    build: {
      target: ['esnext'],
    },

    plugins: [
      vueDevTools(),

      viteStaticCopy({
        targets: [
          {
            // 复制所有 wasm 文件到最终输出根目录，开发/生产均可访问
            src: "../node_modules/onnxruntime-web/dist/*.wasm",
            dest: ".",
          },
          {
            // 同时复制对应的 mjs 包装文件
            src: "../node_modules/onnxruntime-web/dist/*.mjs",
            dest: ".",
          },
        ],
      }),

      vike(),

      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx({}),

      unocss(),

      await createMarkdownPlugin({
        base,
        demoContainerPluginSettings: {
          root: path.resolve(appRoot, './examples'),
          codeSourceTransform: fixPath,
        },
        sourceContainerPluginSettings: {
          root: path.resolve(workRoot, 'packages'),
        },
        propsContainerPluginSettings: {
          root: path.resolve(workRoot, 'packages/components'),
        },
      }),

      Components({
        resolvers: [
          IconsResolver(),
        ],
      }),

      Icons(),
      
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

    css: { // https://www.cnblogs.com/crispyChicken/p/18420010
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  }
  return config
})
