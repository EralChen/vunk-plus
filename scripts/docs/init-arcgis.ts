import { series, dest,src } from 'gulp'
import { gulpTask } from '@vunk/shared/function'
import path from 'path'
import { workRoot, docRoot } from '@lib-env/path'

const inputAssets = path.resolve(workRoot, './node_modules/@arcgis/core/assets')
const outputAssets = path.resolve(docRoot, './public/Esri')

export default series(
  gulpTask('copy assets', async () => {
    //
    return src(inputAssets + '/**/*').pipe(
      dest(outputAssets),
    )
    
  }),
)