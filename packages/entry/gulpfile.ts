import { parallel } from 'gulp'
import path from 'path'
import { fixPath, genTypes } from '@lib-env/build-utils'
import { distDir, distTypesDir, pkgsEntryDir } from '@lib-env/path'
import { LIB_ENTRY_FLIENAME, libExternal } from '@lib-env/build-constants'
import { rollupFiles } from '@vunk/shared/build/rollup'
import { glob } from 'fast-glob'
import { copyFile } from 'fs/promises'
import { gulpTask } from '@vunk/shared/function'

export default parallel(

  gulpTask('bundleFullEntry', async ()=> {
    await rollupFiles({
      input: path.resolve(pkgsEntryDir, `./${LIB_ENTRY_FLIENAME}.ts`),
      outputFile: path.resolve(distDir, './index.esm.js'),
      external: [
        ...libExternal,
      ],
      outputOptions: {
        paths: fixPath,
      },
    })
  }),

  gulpTask('genEntryTypes', async () => { // 生成入口 .d.ts
    const outDir = path.resolve(distTypesDir, './entry')
    await genTypes({
      filesRoot: pkgsEntryDir,
      outDir,
    })

    glob('**/*.d.ts', {
      cwd: outDir,
      absolute: true,
    }).then(files => {
      files.forEach((file) => {
        const dest = path.resolve(distDir, path.basename(file))
        copyFile(file, dest)
      })
    })

  }),

  

)