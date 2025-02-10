import { sleep } from '@vunk/shared/promise'
import { ElMessage } from 'element-plus'
import Recorder from 'recorder-core'
import { ref } from 'vue'
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/wav'
import 'recorder-core/src/engine/mp3-engine'
import 'recorder-core/src/extensions/waveview'
import 'recorder-core/src/app-support/app'

export function useRecorder () {
  const supported = ref(false)
  const recording = ref(false)

  const recorder = new Recorder({
    // mp3格式，指定采样率hz、比特率kbps
    type: 'wav',
    sampleRate: 16000,
    bitRate: 16,
  })

  function open () {
    return new Promise((resolve, reject) => {
      recorder.open(
        () => {
          supported.value = true
          resolve(recorder)
        },
        () => (msg, isUserNotAllow) => {
          supported.value = false
          ElMessage.error(`${isUserNotAllow
            ? '用户未授权, '
            : ''
          }无法录音:${msg}`)
          reject(msg)
        },
      )
    })
  }

  function start () {
    recorder.start()
    recording.value = true
    return recorder
  }

  function stop () {
    return new Promise((resolve, reject) => {
      recorder.stop((blob) => {
        recorder.close() // 关闭录音
        recording.value = false
        resolve(blob)
      }, (err: Error) => {
        ElMessage.error('录音失败')
        console.error(err)
        recorder.close() // 关闭录音
        recording.value = false
        reject(err)
      })
    })
  }

  async function openOrStart () {
    if (supported.value) {
      return open().then(start)
    }
    else {
      return Promise.race([
        open(),
        sleep(550),
      ]).then((v) => {
        if (v) {
          return start()
        }
        return recorder
      })
    }
  }

  return {
    supported,
    recording,
    recorder,

    open,
    stop,
    start,
    openOrStart,

  }
}
