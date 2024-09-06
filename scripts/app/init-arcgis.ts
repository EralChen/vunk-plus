import { appRootDirs, workRoot } from '@lib-env/path'
import { gulpTask } from '@vunk/shared/function'
import { run } from '@vunk/shared/node/process'
import { series } from 'gulp'
import path from 'path'
import fs from 'fs'



const assetsDir = path.resolve(workRoot, './node_modules/@arcgis/core/assets')

const tasks = appRootDirs.map(appRoot => {
  const appPublicDir  = path.resolve(appRoot, 'public')
  return [
    gulpTask('clean', async () => {
      await run('rm -rf Esri', appPublicDir)
    }),
    gulpTask('add', async () => {
      copyFiles(assetsDir, path.resolve(appPublicDir, 'Esri'))
    }),
  ]
}).flat(1)

export default series(tasks)


function copyFiles (srcDir: string, destDir: string) {
  const files = fs.readdirSync(srcDir)
  for (const file of files) {
    const srcPath = path.join(srcDir, file)
    const destPath = path.join(destDir, file)
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyFiles(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
