import { series } from 'gulp'
import { gulpTask } from '@vunk/shared/function'
import { run } from '@vunk/shared/node/process'

import clearDist from './clear-dist'
import toDistType from './to-dist-type'
import mergeCssToDist from './merge-css-to-dist'
import { workRoot } from '@lib-env/path'

export default series(

  clearDist,

  // 并行打包 packages 下的内容
  gulpTask('buildPackages', async () => run(
    'pnpm run --filter "./packages/**/*" --parallel build', 
    workRoot,
  )),
  
  toDistType,
  mergeCssToDist,
)
