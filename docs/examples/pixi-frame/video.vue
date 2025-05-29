<script lang="ts" setup>
import { VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { TickerStatus } from '@vunk/shared/enum'
import { ElButton, ElSwitch } from 'element-plus'
import { computed, ref } from 'vue'

// 状态管理
const status = ref(TickerStatus.pending)
const loop = ref(false)
const base = import.meta.env.BASE_URL || '/'
const videoUrl = ref(`${base}metahuman/F_SLT.mp4`)

// 可选的视频 URL 列表
const videoOptions = [
  {
    label: '元人视频 1 (F_SLT.mp4)',
    value: `${base}metahuman/F_SLT.mp4`,
  },
  {
    label: '元人视频 2 (F_SPK.mp4)',
    value: `${base}metahuman/F_SPK.mp4`,
  },
]

// 显示当前状态的文字描述
const statusText = computed(() => {
  switch (status.value) {
    case TickerStatus.playing:
      return '播放中'
    case TickerStatus.paused:
      return '已暂停'
    case TickerStatus.stopped:
      return '已停止'
    default:
      return '待机中'
  }
})

// 控制方法
function play () {
  status.value = TickerStatus.play
}

function pause () {
  status.value = TickerStatus.pause
}

function stop () {
  status.value = TickerStatus.stop
}

// 状态指示器颜色
const statusColor = computed(() => {
  switch (status.value) {
    case TickerStatus.playing:
      return '#4CAF50'
    case TickerStatus.paused:
      return '#FFC107'
    case TickerStatus.stopped:
      return '#F44336'
    default:
      return '#9E9E9E'
  }
})
</script>

<template>
  <div class="pixi-video-demo">
    <h2>PIXI 视频播放器演示</h2>

    <div class="demo-container">
      <!-- 视频播放器 -->
      <div class="video-container">
        <VkPixiFrame
          v-model:status="status"
          :url="videoUrl"
          :loop="loop"
        />
      </div>

      <!-- 控制面板 -->
      <div class="control-panel">
        <div class="control-group">
          <h3>播放控制</h3>
          <div class="button-group">
            <ElButton
              type="success"
              icon="VideoPlay"
              @click="play"
            >
              播放
            </ElButton>
            <ElButton
              type="warning"
              icon="VideoPause"
              @click="pause"
            >
              暂停
            </ElButton>
            <ElButton
              type="danger"
              icon="VideoStop"
              @click="stop"
            >
              停止
            </ElButton>
          </div>

          <div class="status-display">
            <div class="status-indicator">
              <span class="status-dot" :style="{ backgroundColor: statusColor }"></span>
              <span class="status-text">{{ statusText }}</span>
            </div>
          </div>
        </div>

        <div class="control-group">
          <h3>播放设置</h3>

          <div class="setting-item">
            <label>循环播放:</label>
            <ElSwitch
              v-model="loop"
              active-text="开启"
              inactive-text="关闭"
            />
          </div>

          <div class="setting-item">
            <label>视频源:</label>
            <select v-model="videoUrl" class="video-select">
              <option
                v-for="option in videoOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="control-group">
          <h3>视频信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">当前状态:</span>
              <span class="value">{{ statusText }}</span>
            </div>
            <div class="info-item">
              <span class="label">循环播放:</span>
              <span class="value">{{ loop ? '是' : '否' }}</span>
            </div>
            <div class="info-item">
              <span class="label">视频源:</span>
              <span class="value">{{ videoUrl }}</span>
            </div>
          </div>
        </div>

        <div class="control-group">
          <h3>使用说明</h3>
          <div class="instructions">
            <ul>
              <li>点击播放按钮开始视频播放</li>
              <li>支持暂停、停止、循环播放功能</li>
              <li>视频会自适应容器尺寸，保持宽高比</li>
              <li>使用 PIXI.js 渲染，支持硬件加速</li>
              <li>自动处理视频加载错误和格式不支持的情况</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pixi-video-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.demo-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.video-container {
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  border: 2px solid #ddd;
  border-radius: 12px;
  height: 500px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.video-container::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px dashed #bbb;
  border-radius: 8px;
  pointer-events: none;
  z-index: 1;
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-group {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.control-group h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.status-display {
  margin-top: 12px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.status-text {
  font-weight: 500;
  color: #495057;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  padding: 8px 0;
}

.setting-item label {
  font-weight: 500;
  color: #495057;
}

.video-select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  min-width: 180px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  font-weight: 500;
  color: #6c757d;
}

.info-item .value {
  color: #495057;
  font-family: monospace;
  font-size: 13px;
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 3px;
}

.instructions {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.5;
}

.instructions ul {
  margin: 0;
  padding-left: 18px;
}

.instructions li {
  margin: 6px 0;
}

/* 响应式设计 */
@media (max-width: 968px) {
  .demo-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .video-container {
    height: 300px;
  }

  .button-group {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .pixi-video-demo {
    padding: 15px;
  }

  .control-group {
    padding: 12px;
  }

  .button-group {
    flex-direction: column;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .video-select {
    width: 100%;
  }
}
</style>
