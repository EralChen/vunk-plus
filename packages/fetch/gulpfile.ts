import { parallel } from 'gulp'
import path from 'path'
import { sync } from 'fast-glob'
import { distDir } from '@lib-env/path'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'
import { gulpTask } from '@vunk/shared/function'

const buildFile = '**/index.ts'
const baseDirname = __dirname.split(path.sep).pop() as string
const external = []

const filePaths = sync(buildFile, {
  cwd: path.resolve(__dirname, './'),
  onlyFiles: true,
  absolute: true,
  ignore: filePathIgnore,
})

export default parallel(
  gulpTask(`bundle ${baseDirname}`, async () => {
    await rollupFiles({
      input: filePaths,
      outputDir: path.resolve(distDir, baseDirname),
      external,
    })
  }),
  gulpTask(`gen ${baseDirname} types`, async () => {
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
    })
  }),
)

