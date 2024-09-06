import { NormalObject } from '@vunk/core'

export enum CrowdinFileLang {
  zhCN = 'zh-CN',
  enUS = 'en-US',
} 
export enum CrowdinFilePath {
  menus = 'pages/menus.json'
}


export interface CrowdinFile<S extends NormalObject = NormalObject> {
  lang: string
  path: string
  basename: string
  source: S
}


export type Crowdin = {
  [CrowdinFilePath.menus]: CrowdinFile<
    typeof import('./zh-CN/pages/menus.json')
  >
}

