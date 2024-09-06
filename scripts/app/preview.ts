import { appRootDirs } from '@lib-env/path'
import { gulpTask } from '@vunk/shared/function'
import { run } from '@vunk/shared/node/process'
import { series } from 'gulp'
import path from 'path'

export default series([

  gulpTask('build', async () => {
    await run('npm run build', appRootDirs[0])
  }),
  gulpTask('http-server', async () => {
    await run('npx http-server ./', path.resolve(appRootDirs[0], 'dist'))
  }),
  
])