import { workRoot } from '@lib-env/path'
import { gulpTask } from '@vunk/shared/function'
import { run } from '@vunk/shared/node/process'
import { series } from 'gulp'
import mri from 'mri'

interface MriData {
  v: string // aaa-bbb
}

const argv = process.argv.slice(2)
const mriData = mri<MriData>(argv)
if (!mriData.v) {
  mriData.v = 'latest'
}
export default series([
  gulpTask('docker build', async () => {
    await run(`docker build -t zz-platform-config:${mriData.v} .`, workRoot)
  }),
  gulpTask('docker tag', async () => {
    await run(`docker tag zz-platform-config:${mriData.v} t1.zjsophon.com:58088/snapshot/zz-platform-config:${mriData.v}`, workRoot)
  }),
  gulpTask('docker push', async () => {
    await run(`docker push t1.zjsophon.com:58088/snapshot/zz-platform-config:${mriData.v}`, workRoot)
  }),
 
])
