/// <reference types="vike-vue/dist/+config" />

import type { CrowdinFileLang } from '#/shared'
import type { ApiReturnType } from '@vunk/core'
import type { rCrowdinFilesAsReflect } from '../renderer/crowdin'

declare global {
  namespace Vike {
    interface PageContext {
      crowdin: ApiReturnType<typeof rCrowdinFilesAsReflect>
      lang: CrowdinFileLang
    }
  }

  namespace VikePackages {
    interface ConfigVikeVue {
      /**
       * @deprecated
       * use `pageContext.lang` instead
       */
      lang?: string

    }
  }
}

export {}
