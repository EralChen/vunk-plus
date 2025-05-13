import type { AnyFunc } from '@vunk/shared'
import type { Ref } from 'vue'
import { noop } from '@vunk/shared/function'
import { sleep, waiting } from '@vunk/shared/promise'
import { consola } from 'consola'
// import { ElMessage } from 'element-plus'
import Recorder from 'recorder-core'
import { ref, shallowRef, unref } from 'vue'
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/wav'
import 'recorder-core/src/engine/mp3-engine'
import 'recorder-core/src/extensions/waveview'
import 'recorder-core/src/app-support/app'

export function useRecorder (options?: {
  waveViewRef?: Ref<any>
  defaultOptions?: any
}) {
  const waveViewRef = options?.waveViewRef
  const defaultOptions = options?.defaultOptions

  const supported = ref(false)
  const recording = ref(false)
  const opening = ref(false)
  const wave = shallowRef<any>(null)

  const recorder = new Recorder({
    // mp3格式，指定采样率hz、比特率kbps
    type: 'wav',
    sampleRate: 16000,
    bitRate: 16,
    ...defaultOptions,
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
        (msg, isUserNotAllow) => {
          supported.value = false
          consola.error('recorder open error', msg, isUserNotAllow)
          reject(msg)
        },
      )
    })
  }

  function start () {
    const waveView = unref(waveViewRef)
    if (
      Recorder.WaveView
      && waveView
      && !wave.value
    ) {
      waiting(() => waveView.clientWidth > 0)
        .then(() => {
          wave.value = Recorder.WaveView({
            elem: waveView,
          })
        })
    }

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
        // ElMessage.error('录音失败')
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
  async function openOrStart (options?: {
    /**
     * 回调函数，返回值为boolean
     * 若返回true，则开始录音
     * 若返回false，则不开始录音
     */
    openThen?: AnyFunc
  }) {
    const openThen = options?.openThen || noop
    if (supported.value) {
      return open().then(start)
    }
    else {
      return Promise.race([
        open(),
        sleep(2500),
      ]).then(async (v) => {
        consola.info('openOrStart', v)
        let startEnable = !!v
        if (!v) { // 正在授权
          const flag = await openThen()
          if (typeof flag === 'boolean') {
            startEnable = flag
          }
        }
        return startEnable ? start() : v
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
    wave,

  }
}
