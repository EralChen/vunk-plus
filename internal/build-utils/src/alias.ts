import { LIB_NAME, LIB_ALIAS } from '@lib-env/build-constants'
import type { Plugin } from 'vite'

export const fixPath = (id: string) => id.replaceAll(`${LIB_ALIAS}`, LIB_NAME)

export const replaceLibAlias = () => ({
  name: 'replace-lib-alias',
  generateBundle(options, bundle) {
    for (const fileName of Object.keys(bundle)) {
      const chunk = bundle[fileName]
      if (chunk.type === 'chunk') {
        chunk.code = fixPath(chunk.code)
      }
    }
  },
} as Plugin)