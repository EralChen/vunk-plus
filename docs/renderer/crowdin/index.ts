import type { NormalObject } from '@vunk/core'
import type { CrowdinFile, CrowdinFileLangMedia } from '../../shared'
import path from 'node:path'
import { CrowdinFileLang } from '../../shared'

export const crowdinFileLangOptions: CrowdinFileLangMedia[] = [
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
export const crowdinFileLangReflect = crowdinFileLangOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<CrowdinFileLang, CrowdinFileLangMedia>)

export async function rCrowdinFiles (
  lang: CrowdinFileLang = CrowdinFileLang.zhCN,
) {
  const files = crowdinFileLangReflect[lang]?.glob || []
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
    acc[cur.path] = cur
    return acc
  }, {} as Record<string/* path */, CrowdinFile>)
}
