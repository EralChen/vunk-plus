import fs from 'node:fs'
import path from 'node:path'
import { consola } from 'consola'

const buildShard = path.resolve(__dirname, './dist/shared')
const targetShared = path.resolve(__dirname, '../../dist/shared')

fs.cpSync(buildShard, targetShared, {
  recursive: true,
})

// 匹配所有 *.worker.js 文件, 复制 worker 文件到目标目录
const buildRoot = path.resolve(__dirname, './dist')

const targetAssets = path.resolve(__dirname, '../../dist/assets')
if (!fs.existsSync(targetAssets)) {
  fs.mkdirSync(targetAssets, { recursive: true })
}

const onnxruntimeDist = path.resolve(__dirname, '../../node_modules/onnxruntime-web/dist')

if (!fs.existsSync(onnxruntimeDist)) {
  consola.error('onnxruntime-web/dist not found, please install onnxruntime-web package.')
  process.exit(1)
}

const wasmFiles = fs.readdirSync(onnxruntimeDist)

for (const file of wasmFiles) {
  if (file.endsWith('.wasm') || file.endsWith('.mjs')) {
    const srcPath = path.join(onnxruntimeDist, file)
    const targetPath = path.join(targetAssets, file)

    fs.copyFileSync(srcPath, targetPath)

    consola.log('copied:', srcPath, '→', targetPath)
  }
}

const entries = fs.readdirSync(buildRoot, { withFileTypes: true })

for (const entry of entries) {
  const srcPath = path.join(buildRoot, entry.name)
  const targetPath = path.join(targetAssets, entry.name)

  if (entry.name.endsWith('.worker.js')) {
    // 复制文件
    fs.copyFileSync(srcPath, targetPath)

    consola.log('copied:', srcPath, '→', targetAssets)
  }
}
