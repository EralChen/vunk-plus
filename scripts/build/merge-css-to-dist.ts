import path from 'node:path'
import fs from 'node:fs'
import { distDir } from '@lib-env/path'

import { gulpTask } from '@vunk/shared/function'
import { sync } from 'fast-glob'
import { dest, series, src } from 'gulp'
import concat from 'gulp-concat'

export default series(
  // 合并所有css到入口
  gulpTask('buildCss', async () => {
    const cssOutPath = path.resolve(distDir, './components')

    const cssFiles = sync('**/*.css', {
      cwd: cssOutPath,
      onlyFiles: true,
    })
    const elementCssFile = path.resolve(distDir, './element/index.css')
    if (fs.existsSync(elementCssFile)) {
      cssFiles.push(elementCssFile)
    }

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
