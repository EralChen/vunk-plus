import { DOCS_DIR_NAME } from '@lib-env/build-constants'
import path from 'path'

export const workRoot = path.resolve(__dirname, '../../../')
export const packagesDir = path.resolve(workRoot, './packages')

// components
export const pkgsComponentsDir = path.resolve(packagesDir, './components')

// shared
export const pkgsSharedDir = path.resolve(packagesDir, './shared')

// composables
export const pkgsComposablesDir = path.resolve(packagesDir, './composables')

// icons
export const pkgsIconsDir = path.resolve(packagesDir, './icons')

// element
export const pkgsElementDir = path.resolve(packagesDir, './element')

// ant (vendored ant-design-vue)
export const pkgsAntDir = path.resolve(packagesDir, './ant')

// antx (vendored ant-design-x-vue)
export const pkgsAntxDir = path.resolve(packagesDir, './antx')

// vue-virtual-scroller (vendored, with pageMode scrollToBottom fix)
export const pkgsVueVirtualScrollerDir = path.resolve(packagesDir, './vue-virtual-scroller')

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
