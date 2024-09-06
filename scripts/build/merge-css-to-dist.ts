import { dest, series, src } from 'gulp'
import { gulpTask } from '@vunk/shared/function'

import { distDir } from '@lib-env/path'
import path from 'path'
import { sync } from 'fast-glob'
import concat from 'gulp-concat'
export default series(
  // 合并所有css到入口
  gulpTask('buildCss', async () => {

    const cssOutPath = path.resolve(distDir, './components')

    const cssFiles = sync('**/*.css', {
      cwd: cssOutPath,
      onlyFiles: true,
    })
    if (!cssFiles.length) return
    src(
      cssFiles.map(css => path.resolve(cssOutPath, css)),
    )
      .pipe(
        concat('index.css'),
      )
      .pipe(
        dest(
          path.resolve(distDir),
        ),
      )
    
  }),
  

)