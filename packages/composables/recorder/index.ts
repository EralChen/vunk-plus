import { sleep } from '@vunk/shared/promise'
import { consola } from 'consola'
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
  const opening = ref(false)

  const recorder = new Recorder({
    // mp3格式，指定采样率hz、比特率kbps
    type: 'wav',
    sampleRate: 16000,
    bitRate: 16,
  })

  function open () {
    opening.value = true

    return new Promise((resolve, reject) => {
      recorder.open(
        () => {
          supported.value = true
          opening.value = false
          consola.info('recorder open success', recorder)
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
    return new Promise<Blob>((resolve, reject) => {
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

  /**
   * 若没有授权，则尝试发起授权
   * 若已授权，则直接开始录音
   * @returns {Promise<Recorder|undefined>} 若开始录音，则返回Recorder实例，否则返回undefined
   */
  async function openOrStart () {
    if (supported.value) {
      return open().then(start)
    }
    else {
      return Promise.race([
        open(),
        sleep(1500),
      ]).then((v) => {
        if (!v)
          return
        return start()
      })
    }
  }

  return {
    supported,
    recording,
    opening,
    recorder,

    open,
    stop,
    start,
    openOrStart,

  }
}
