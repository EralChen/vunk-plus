<script lang="ts" setup>
import { VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { useUpdating } from '@vunk/core/composables'
import { TickerStatus } from '@vunk/shared/enum'
import { ElButton } from 'element-plus'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'

// 纯色 DataURL 生成函数
function createColorDataUrl (color: string, width = 200, height = 200) {
  // 仅在浏览器环境中执行
  if (typeof document === 'undefined')
    return ''

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 添加颜色文本标识
    ctx.fillStyle = getContrastColor(color)
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(color, width / 2, height / 2)
  }

  return canvas.toDataURL('image/png')
}

// 计算对比色，确保文字在背景上可见
function getContrastColor (hexColor: string) {
  // 移除#前缀
  const color = hexColor.replace('#', '')

  // 转换为RGB
  const r = Number.parseInt(color.substring(0, 2), 16)
  const g = Number.parseInt(color.substring(2, 4), 16)
  const b = Number.parseInt(color.substring(4, 6), 16)

  // 计算亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // 亮度大于128返回黑色，否则返回白色
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

// 颜色序列定义
const colorSequences: Record<string, string[]> = {
  rainbow: [
    '#FF0000', // 红
    '#FF7F00', // 橙
    '#FFFF00', // 黄
    '#00FF00', // 绿
    '#0000FF', // 蓝
    '#4B0082', // 靛
    '#9400D3', // 紫
  ],
  redToBlue: [
    '#FF0000',
    '#FF3333',
    '#FF6666',
    '#FF9999',
    '#FFCCCC',
    '#CCCCFF',
    '#9999FF',
    '#6666FF',
    '#3333FF',
    '#0000FF',
  ],
  grayScale: [
    '#000000',
    '#222222',
    '#444444',
    '#666666',
    '#888888',
    '#AAAAAA',
    '#CCCCCC',
    '#EEEEEE',
    '#FFFFFF',
    '#EEEEEE',
    '#CCCCCC',
    '#AAAAAA',
    '#888888',
    '#666666',
    '#444444',
    '#222222',
  ],
}

// 状态
const status = ref(TickerStatus.pending)
const frameRate = ref(24)
const loop = ref(false)
const selectedSequence = ref('rainbow')
const frameWidth = ref(300)
const frameHeight = ref(200)
const frames = reactive<string[]>([])

const updating = useUpdating(nextTick)

// 根据选择的序列生成帧数据
function generateFrames () {
  frames.splice(0, frames.length) // 清空数组

  const colors = colorSequences[selectedSequence.value]
  if (!colors)
    return

  setTimeout(() => {
    // 延迟生成DataURL，确保在浏览器环境中执行
    colors.forEach((color: string) => {
      const dataUrl = createColorDataUrl(color, frameWidth.value, frameHeight.value)
      frames.push(dataUrl)
    })
  }, 10)
}

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

// 当颜色序列或尺寸改变时，重新生成帧
function updateFrames () {
  generateFrames()
}

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

// 组件挂载后生成初始帧
onMounted(() => {
  generateFrames()
})
</script>

<template>
  <div class="pixi-frame-demo">
    <h3>
      帧动画播放器演示
    </h3>

    <p>
      <span>
        该组件播放时会随时释放资源, 如果配置变化, 请重新加载组件
      </span>

      <ElButton ml-m @click="updating = true">
        reload
      </ElButton>
    </p>

    <div class="frame-container">
      <VkPixiFrame
        v-if="!updating"
        v-model:status="status"
        :data="frames"
        :frame-rate="frameRate"
        :loop="loop"
      />
    </div>

    <div class="controls">
      <div class="control-group">
        <h3>播放控制</h3>
        <div class="buttons">
          <button class="control-btn play" @click="play">
            播放
          </button>
          <button class="control-btn pause" @click="pause">
            暂停
          </button>
          <button class="control-btn stop" @click="stop">
            停止
          </button>
        </div>
        <div class="status">
          当前状态: {{ statusText }}
        </div>
      </div>

      <div class="control-group">
        <h3>帧率控制</h3>
        <div class="slider-container">
          <input
            v-model.number="frameRate"
            type="range"
            min="1"
            max="60"
          >
          <span class="value">{{ frameRate }} FPS</span>
        </div>
      </div>

      <div class="control-group">
        <h3>循环播放</h3>
        <label class="toggle">
          <input v-model="loop" type="checkbox">
          <span>{{ loop ? '开启' : '关闭' }}</span>
        </label>
      </div>

      <div class="control-group">
        <h3>颜色序列</h3>
        <select v-model="selectedSequence" @change="updateFrames">
          <option value="rainbow">
            彩虹色
          </option>
          <option value="redToBlue">
            红蓝渐变
          </option>
          <option value="grayScale">
            灰度渐变
          </option>
        </select>
      </div>

      <div class="control-group">
        <h3>帧尺寸</h3>
        <div class="size-controls">
          <div>
            <label>宽度:</label>
            <input v-model.number="frameWidth" type="number" min="50" max="800" @change="updateFrames">
          </div>
          <div>
            <label>高度:</label>
            <input v-model.number="frameHeight" type="number" min="50" max="600" @change="updateFrames">
          </div>
        </div>
      </div>

      <div class="control-group">
        <h3>帧数据信息</h3>
        <div class="info">
          当前序列: {{ selectedSequence }}
        </div>
        <div class="info">
          帧数量: {{ frames.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.pixi-frame-demo {
  font-family: Arial, sans-serif;
}

.frame-container {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  background-color: #f5f5f5;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.control-group {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.control-group h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.control-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.play {
  background-color: #4CAF50;
}

.pause {
  background-color: #FFC107;
}

.stop {
  background-color: #F44336;
}

.status {
  margin-top: 10px;
  font-weight: bold;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-container input {
  flex: 1;
}

.value {
  min-width: 60px;
  text-align: right;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
}

.size-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.size-controls div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.size-controls label {
  min-width: 50px;
}

.size-controls input {
  width: 80px;
  padding: 4px;
}

.info {
  margin: 5px 0;
}
</style>
