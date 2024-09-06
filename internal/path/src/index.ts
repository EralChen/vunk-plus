import { DOCS_DIR_NAME } from '@lib-env/build-constants'
import path from 'path'

export const workRoot = path.resolve(__dirname, '../../../')
export const packagesDir = path.resolve(workRoot, './packages')

// components
export const pkgsComponentsDir = path.resolve(packagesDir, './components')

// entry
export const pkgsEntryDir = path.resolve(packagesDir, './entry')
export const pkgsEntryFile = path.resolve(pkgsEntryDir, './main.ts')

// dist
export const distDir = path.resolve(workRoot, './dist')
export const distTypesDir = path.resolve(distDir, './typings')


// Docs
export const docRoot = path.resolve(workRoot, DOCS_DIR_NAME)
export const vpRoot = path.resolve(docRoot, '.vitepress')


// package.json
export const docPackage = path.resolve(docRoot, 'package.json')
export const entryPackage = path.resolve(pkgsEntryDir, 'package.json')

// app
export const appRoot = path.resolve(workRoot, 'app')
export const appRootDirs = [
  path.resolve(workRoot, 'app'),
]
