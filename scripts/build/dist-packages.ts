import { series } from 'gulp'
import { gulpTask } from '@vunk/shared/function'
import fsp from 'fs/promises'
import fs from 'fs'
import {
  distDir,
  pkgsComponentsDir,
  pkgsSharedDir,
  pkgsComposablesDir,
  pkgsIconsDir,
  pkgsElementDir,
  pkgsEntryDir,
} from '@lib-env/path'
import path from 'path'
import { sync } from 'fast-glob'
import { fixPath } from '@lib-env/build-utils'

const packages = [
  { name: 'components', dir: pkgsComponentsDir },
  { name: 'shared', dir: pkgsSharedDir },
  { name: 'composables', dir: pkgsComposablesDir },
  { name: 'icons', dir: pkgsIconsDir },
  { name: 'element', dir: pkgsElementDir },
  { name: 'entry', dir: pkgsEntryDir, isEntry: true },
]

export default series(
  gulpTask('dist-packages:move', async () => {
    for (const pkg of packages) {
      const pkgDist = path.resolve(pkg.dir, 'dist')

      if (!fs.existsSync(pkgDist)) {
        console.warn(`[dist-packages:move] Skipping ${pkg.name}, dist directory not found: ${pkgDist}`)
        continue
      }

      if (pkg.isEntry) {
        const entryFiles = sync('index.{esm.js,d.ts}', {
          cwd: pkgDist,
          absolute: true,
        })
        for (const file of entryFiles) {
          const dest = path.resolve(distDir, path.basename(file))
          await fsp.mkdir(path.dirname(dest), { recursive: true })
          await fsp.rename(file, dest)
        }
      }
      else {
        const targetDir = path.resolve(distDir, pkg.name)
        await fsp.mkdir(distDir, { recursive: true })
        await fsp.rename(pkgDist, targetDir)
      }
    }
  }),

  gulpTask('dist-packages:fix-alias', async () => {
    const files = sync('**/*.{mjs,cjs,js,d.ts}', {
      cwd: distDir,
      onlyFiles: true,
      absolute: true,
    })

    for (const file of files) {
      const content = await fsp.readFile(file, 'utf-8')
      const newContent = fixPath(content)
      if (newContent !== content) {
        await fsp.writeFile(file, newContent, 'utf-8')
      }
    }
  }),
)
