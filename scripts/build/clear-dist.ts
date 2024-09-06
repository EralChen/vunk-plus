import { series } from 'gulp'
import { gulpTask } from '@vunk/shared/function'
import fsp from 'fs/promises'
import { distDir } from '@lib-env/path'

export default series(
  gulpTask('clear-dist', async () => {
    await fsp.rm(distDir, {
      recursive: true, 
      force: true,
    })
  }),

)