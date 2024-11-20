import path from 'path'
import { distTypesDir, workRoot } from '@lib-env/path'
import { fixPath } from './alias'
import { genDtsFiles } from '@vunk/shared/build/morph'
import { LIB_ALIAS, LIB_NAME } from '@lib-env/build-constants'

export async function genTypes (opts = {} as {
  filesRoot: string
  source?: string
  outDir?: string
}) { // 生成一个 .d.ts

  const outDir = path.resolve(distTypesDir, opts.outDir ?? '')
  const globSource = opts.source ?? '**/*'
  const globCwd = opts.filesRoot

  await genDtsFiles({
    root: workRoot,

    
    compilerOptions: {
      outDir,
      paths: {
        [`${LIB_NAME}/*`]: ['packages/*'],
        [`${LIB_ALIAS}/*`]: ['packages/*'],
      },
    },
    globSource,
    globCwd,
    transform: fixPath,
  })

}