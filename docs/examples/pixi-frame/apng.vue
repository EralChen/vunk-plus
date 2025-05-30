<script lang="ts" setup>
import { VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { TickerStatus } from '@vunk/shared/enum'
import { computed, ref } from 'vue'

// 动画状态控制
const status = ref<TickerStatus>(TickerStatus.pending)
const loop = ref(true)
const frameRate = ref(24)

// 测试用的APNG URL
const base = import.meta.env.BASE_URL || '/'
const apngUrl = `${base}metahuman/M_SILENT.png`

// 播放控制函数
function play () {
  status.value = TickerStatus.play
}

function pause () {
  status.value = TickerStatus.pause
}

function stop () {
  status.value = TickerStatus.stop
}

function toggleLoop () {
  loop.value = !loop.value
}

// 状态显示
const statusText = computed(() => {
  switch (status.value) {
    case TickerStatus.pending:
      return '准备中'
    case TickerStatus.playing:
      return '播放中'
    case TickerStatus.paused:
      return '已暂停'
    case TickerStatus.stopped:
      return '已停止'
    default:
      return '未知状态'
  }
})
</script>

<template>
  <div class="apng-example">
    <h2>APNG 动画播放示例</h2>

    <div class="demo-container">
      <div class="pixi-container">
        <VkPixiFrame
          v-model:status="status"
          :url="apngUrl"
          :loop="loop"
          :frame-rate="frameRate"
        />
      </div>

      <div class="controls">
        <div class="status-info">
          <p><strong>当前状态:</strong> {{ statusText }}</p>
          <p><strong>循环播放:</strong> {{ loop ? '开启' : '关闭' }}</p>
          <p><strong>帧率:</strong> {{ frameRate }} FPS</p>
          <p><strong>APNG URL:</strong> {{ apngUrl }}</p>
        </div>

        <div class="frame-rate-control">
          <label for="frameRate">帧率控制: {{ frameRate }} FPS</label>
          <input
            id="frameRate"
            v-model="frameRate"
            type="range"
            min="1"
            max="60"
            step="1"
            class="frame-rate-slider"
          >
        </div>

        <div class="control-buttons">
          <button :disabled="status === TickerStatus.playing" @click="play">
            播放
          </button>
          <button :disabled="status !== TickerStatus.playing" @click="pause">
            暂停
          </button>
          <button :disabled="status === TickerStatus.pending" @click="stop">
            停止
          </button>
          <button @click="toggleLoop">
            {{ loop ? '关闭' : '开启' }}循环
          </button>
        </div>
      </div>
    </div>

    <div class="description">
      <h3>功能说明</h3>
      <ul>
        <li>支持APNG格式的动画图片播放</li>
        <li>提供播放、暂停、停止控制</li>
        <li>支持循环播放设置</li>
        <li>支持自定义帧率控制（1-60 FPS）</li>
        <li>自动缩放以适应容器大小</li>
        <li>基于PIXI.js渲染，性能优异</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.apng-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: flex-start;
}

.pixi-container {
  flex-shrink: 0;
}

.controls {
  flex: 1;
  min-width: 300px;
}

.status-info {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.status-info p {
  margin: 5px 0;
  font-size: 14px;
}

.frame-rate-control {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.frame-rate-control label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
}

.frame-rate-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  cursor: pointer;
}

.frame-rate-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
}

.frame-rate-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
  border: none;
}

.control-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.control-buttons button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.control-buttons button:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #999;
}

.control-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.description {
  margin-top: 30px;
  padding: 20px;
  background: #fafafa;
  border-radius: 4px;
}

.description h3 {
  margin-top: 0;
  color: #333;
}

.description ul {
  padding-left: 20px;
}

.description li {
  margin: 5px 0;
}

.description pre {
  background: #f0f0f0;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
}

.description code {
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .demo-container {
    flex-direction: column;
  }

  .pixi-container {
    width: 100%;
  }
}
</style>
