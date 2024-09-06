import type { NormalObject } from '@vunk/core'
import path from 'path'
import { CrowdinFileLang, CrowdinFilePath } from './output'
import { globSync } from 'fast-glob'


function importGlob (pattern: string) {
  const files = globSync(pattern, {
    cwd: __dirname,
  })
  
  return files.reduce((acc, file) => {
    acc[file] = () => import(file) // 使用动态 import 来模拟异步导入
    return acc
  }, {} as Record<string, () => Promise<NormalObject>>)
}

interface CrowdinFile<S extends NormalObject = NormalObject> {
  lang: string
  path: string
  basename: string
  source: S
}

/* lang */

interface CrowdinFileLangMedia {
  label: string
  value: CrowdinFileLang
  glob: Record<string, () => Promise<NormalObject>>
}
const CrowdinFileLangOptions: CrowdinFileLangMedia[]  = [
  {
    label: '中文',
    value: CrowdinFileLang.zhCN,
    glob: importGlob('./zh-CN/**/*.json'),
  },
  {
    label: '英文',
    value: CrowdinFileLang.enUS,
    glob: importGlob('./en-US/**/*.json'),
  },
]
const CrowdinFileLangReflect = CrowdinFileLangOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
} , {} as Record<CrowdinFileLang, CrowdinFileLangMedia>)
/* end of lang */




async function rCrowdinFiles (
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

async function rCrowdin (
  lang?: CrowdinFileLang,
) {
  const res = await rCrowdinFiles(lang)
  return res.reduce((acc, cur) => {
    acc[cur.path as CrowdinFilePath] = cur
    return acc
  }, {} as  Record<CrowdinFilePath, CrowdinFile>)
}

export async function rCrowdinReflect () {

  const crowdinReflect = {} as Record<
    CrowdinFileLang, 
    Record<CrowdinFilePath, CrowdinFile>
  >

  for (const lang of CrowdinFileLangOptions) {
    const files = await rCrowdin(lang.value)
    crowdinReflect[lang.value] = files
  }

  return crowdinReflect
}

