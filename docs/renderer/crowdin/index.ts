import { NormalObject } from '@vunk/core'
import path from 'path'

export interface CrowdinFile<S extends NormalObject = NormalObject> {
  lang: string
  path: string
  basename: string
  source: S
}

/* lang */
export enum CrowdinFileLang {
  zhCN = 'zh-CN',
  enUS = 'en-US',
} 
export interface CrowdinFileLangMedia {
  label: string
  value: CrowdinFileLang
  glob: Record<string, () => Promise<NormalObject>>
}
export const CrowdinFileLangOptions: CrowdinFileLangMedia[]  = [
  {
    label: '中文',
    value: CrowdinFileLang.zhCN,
    glob: import.meta.glob('./zh-CN/**/*.json'),
  },
  {
    label: '英文',
    value: CrowdinFileLang.enUS,
    glob: import.meta.glob('./en-US/**/*.json'),
  },
]
export const CrowdinFileLangReflect = CrowdinFileLangOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
} , {} as Record<CrowdinFileLang, CrowdinFileLangMedia>)
/* end of lang */


export enum CrowdinFilePath {
  component = 'pages/component.json'
}

export async function rCrowdinFiles (
  lang: CrowdinFileLang =  CrowdinFileLang.zhCN,
) {

  const files = CrowdinFileLangReflect[lang]?.glob || []
  const crowdinFiles: CrowdinFile[] = []

  for (const filepath in files) {
    const paths = filepath.split('/')
    crowdinFiles.push({
      lang: paths[1],
      path: paths.slice(2).join('/'),
      basename: path.basename(filepath),
      source: (await files[filepath]()).default as NormalObject,
    })
  }

  return crowdinFiles
}
export async function rCrowdinFilesAsReflect (
  lang?: CrowdinFileLang,
) {
  const res = await rCrowdinFiles(lang)
  return res.reduce((acc, cur) => {
    acc[cur.path as CrowdinFilePath] = cur
    return acc
  }, {} as Record<string/* path */, CrowdinFile>)
}

