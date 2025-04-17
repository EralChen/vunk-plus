<script lang="ts">
import type { Ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import Recorder from 'recorder-core'
import { defineComponent, onUnmounted, ref, shallowRef } from 'vue'
import { emits, props } from './ctx'
import { speechToText } from './speech-to-text'
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/wav'
import 'recorder-core/src/engine/mp3-engine'
import 'recorder-core/src/extensions/waveview'
import 'recorder-core/src/app-support/app'

const LONG_PRESS_DURATION = 100 // 长按阈值，单位毫秒 (0.1秒)

export default defineComponent({
  name: 'VkRecorderButton',
  components: {
    ElButton,
  },
  props,
  emits,
  setup (props, { emit }) {
    const supported = ref(false)

    const recording = ref(false)
    const recordingNode = ref() as Ref<HTMLSpanElement>
    const wave = shallowRef()
    const blobUrl = ref('')
    let pressTimer: any = null

    const rec = new Recorder({
      // mp3格式，指定采样率hz、比特率kbps
      type: 'wav',
      sampleRate: 16000,
      bitRate: 16,
      onProcess,
    })

    const recOpen = () => {
      return new Promise((resolve, reject) => {
        rec.open(() => {
          supported.value = true
          if (Recorder.WaveView) {
            wave.value = Recorder.WaveView({
              elem: recordingNode.value,
            })
          }
          resolve(true)
        }, (msg, isUserNotAllow) => {
          ElMessage.error(`${isUserNotAllow ? '用户未授权, ' : ''}无法录音:${msg}`)
          reject(new Error(msg))
        })
      })
    }

    // 处理开始录音的逻辑
    const startRecording = async () => {
      await recOpen()
      if (!supported.value)
        return
      rec.start()
      recording.value = true
    }

    const isDragging = ref(false)
    const dragPosition = ref({ x: 0, y: 0 })
    const cancelZone = ref(false)
    const isTextZone = ref(false) // 添加文本区域状态
    let isMouseDown = false // 添加这个变量来跟踪鼠标状态

    // 处理停止录音的逻辑
    const stopRecording = () => {
      const theTextZone = isTextZone.value
      rec.stop(async (blob) => {
        blobUrl.value = (window.URL || webkitURL).createObjectURL(blob)
        rec.close() // 关闭录音
        recording.value = false

        emit('submit', {
          blob,
          url: blobUrl.value,
        })

        // 如果在文本按钮区域释放，则转换为文本
        if (theTextZone) {
          if (props.onTextZone) {
            props.onTextZone({
              blob,
              url: blobUrl.value,
            })
          }
          else {
            // ElMessage.info('正在转换为文字...')
            speechToText(props.speenchToTextUrl, blob)
              .then((text) => {
                emit('submitText', text)
              })
              .catch((err) => {
                console.error('语音识别错误:', err)
                ElMessage.error('转换文字失败')
              })
          }
        }
      })
    }

    // 添加事件监听
    const addDocumentListeners = () => {
      document.addEventListener('mousemove', onmousemove)
      document.addEventListener('mouseup', onmouseup)
    }

    // 移除事件监听
    const removeDocumentListeners = () => {
      document.removeEventListener('mousemove', onmousemove)
      document.removeEventListener('mouseup', onmouseup)
    }

    // 修改鼠标按下逻辑
    const onmousedown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      isMouseDown = true
      const touch = 'touches' in e ? e.touches[0] : e
      dragPosition.value = { x: touch.clientX, y: touch.clientY }

      // 如果是鼠标事件，添加document事件监听
      if (e instanceof MouseEvent) {
        addDocumentListeners()
      }

      pressTimer = setTimeout(() => {
        if (isMouseDown) {
          isDragging.value = true
          startRecording()
        }
      }, LONG_PRESS_DURATION)
    }

    // 修改移动逻辑，检查是否在文本区域
    function onmousemove (e: MouseEvent | TouchEvent) {
      e.preventDefault()
      if (!isDragging.value)
        return

      const touch = 'touches' in e ? e.touches[0] : e
      dragPosition.value = { x: touch.clientX, y: touch.clientY }

      // 检查是否在取消区域或文本区域
      const cancelBtn = document.querySelector('.cancel-btn')
      const textBtn = document.querySelector('.text-btn')

      if (cancelBtn && textBtn) {
        const cancelRect = cancelBtn.getBoundingClientRect()
        const textRect = textBtn.getBoundingClientRect()

        cancelZone.value = (
          touch.clientX >= cancelRect.left
          && touch.clientX <= cancelRect.right
          && touch.clientY >= cancelRect.top
          && touch.clientY <= cancelRect.bottom
        )

        isTextZone.value = (
          touch.clientX >= textRect.left
          && touch.clientX <= textRect.right
          && touch.clientY >= textRect.top
          && touch.clientY <= textRect.bottom
        )
      }
    }

    // 修改释放逻辑
    function onmouseup (e: MouseEvent | TouchEvent) {
      isMouseDown = false
      clearTimeout(pressTimer)
      if (isDragging.value) {
        if (cancelZone.value) {
          rec.close()
        }
        else {
          stopRecording()
        }
        isDragging.value = false
        cancelZone.value = false
        isTextZone.value = false
      }

      if (e instanceof MouseEvent) {
        removeDocumentListeners()
      }
    }

    function onProcess (
      buffers,
      powerLevel,
      bufferDuration,
      bufferSampleRate,
      // newBufferIdx,
      // asyncEnd,
    ) {
      wave.value?.input(
        buffers[buffers.length - 1],
        powerLevel,
        bufferSampleRate,
      )
    }

    // 组件卸载时清理
    onUnmounted(() => {
      removeDocumentListeners()
    })

    return {
      onmousedown,
      onmousemove,
      onmouseup,
      recording,
      recordingNode,
      blobUrl,
      isDragging,
      cancelZone,
      isTextZone,
    }
  },
})
</script>

<template>
  <div class="vk-recorder-container">
    <!-- 遮罩层 -->
    <Teleport :to="appendTo">
      <div
        v-if="isDragging"
        class="vk-recording-mask"
      >
        <!-- 录音提示区域移到上面 -->
        <div class="recording-tip">
          <div ref="recordingNode" class="wave-container"></div>
          <div class="tip-text">
            {{ cancelZone ? '松开手指，取消发送' : '松开发送，上滑取消' }}
          </div>
        </div>

        <div class="action-buttons">
          <div
            class="cancel-btn"
            :class="{ active: cancelZone }"
          >
            <div class="btn-icon">
              ×
            </div>
            <div class="btn-text">
              取消发送
            </div>
          </div>
          <div
            class="text-btn"
            :class="{ active: isTextZone }"
          >
            <div class="btn-icon">
              文
            </div>
            <div class="btn-text">
              转为文字
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 录音按钮 -->
    <ElButton
      v-bind="$attrs"
      class="vk-recorder-button"
      :class="{
        'is-recording': recording,
      }"
      size="large"
      @touchstart="onmousedown"
      @touchmove="onmousemove"
      @touchend="onmouseup"
      @mousedown="onmousedown"
    >
      <span class="vk-recorder-button-text">按住 说话</span>
    </ElButton>
  </div>
</template>

<style>
.vk-recorder-container {
  position: relative;
}

.vk-recorder-button {
  position: relative;
  width: 100%;
  touch-action: none;
  user-select: none;
}

.vk-recording-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.action-buttons {
  pointer-events: auto;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  margin-bottom: 10%;
}

.cancel-btn, .text-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.btn-icon {
  width: 60px; /* 增大按钮尺寸 */
  height: 60px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 8px;
}

.cancel-btn.active .btn-icon {
  background: var(--el-color-danger);
}

.text-btn.active .btn-icon {
  background: var(--el-color-primary);
}

.btn-text {
  font-size: 14px;
}

.recording-tip {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px; /* 向上移动一些 */
  color: white;
}

.wave-container {
  width: 160px; /* 增大波形显示区域 */
  height: 100px;
  margin-bottom: 20px;
}

.tip-text {
  font-size: 14px;
}
</style>
