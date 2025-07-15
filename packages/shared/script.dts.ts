import path from 'node:path'
import { genTypes } from '@lib-env/build-utils'
import { gulpTask } from '@vunk/shared/function'

const baseDirname = __dirname.split(path.sep).pop() as string

const task = gulpTask(`gen ${baseDirname} types`, async () => {
  await genTypes({
    filesRoot: path.resolve(__dirname),
    outDir: baseDirname,
    source: '**/index.ts',
  })
})

task()
