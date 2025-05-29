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
    <h4>PIXI 视频播放器演示</h4>

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
              @click="play"
            >
              播放
            </ElButton>
            <ElButton
              type="warning"
              @click="pause"
            >
              暂停
            </ElButton>
            <ElButton
              type="danger"
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
