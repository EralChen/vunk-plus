<script lang="ts" setup>
import type { SetDataEvent } from '@vunk/core'
import type { __VkfForm } from '@vunk/form'
import { VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { useUpdating } from '@vunk/core/composables'
import { VkfForm } from '@vunk/form'
import { TickerStatus } from '@vunk/shared/enum'
import {
  ElButton,
  ElSpace,
  ElTag,
  ElText,
} from 'element-plus'
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

// 表单数据
const formData = reactive({
  frameRate: 24,
  loop: false,
  selectedSequence: 'rainbow',
  frameWidth: 300,
  frameHeight: 200,
})

// 状态
const status = ref(TickerStatus.pending)
const frames = reactive<string[]>([])

const updating = useUpdating(nextTick)

// 表单项配置
const formItems: __VkfForm.FormItem[] = [
  {
    label: '帧率控制',
    prop: 'frameRate',
    templateType: 'VkfSlider',
    min: 1,
    max: 60,
    showStops: true,
  },
  {
    label: '循环播放',
    prop: 'loop',
    templateType: 'VkfSwitch',
  },
  {
    label: '颜色序列',
    prop: 'selectedSequence',
    templateType: 'VkfSelect',
    options: [
      { label: '彩虹色', value: 'rainbow' },
      { label: '红蓝渐变', value: 'redToBlue' },
      { label: '灰度渐变', value: 'grayScale' },
    ],
  },
  {
    label: '帧宽度',
    prop: 'frameWidth',
    templateType: 'VkfInputNumber',
    min: 50,
    max: 800,
  },
  {
    label: '帧高度',
    prop: 'frameHeight',
    templateType: 'VkfInputNumber',
    min: 50,
    max: 600,
  },
]

// 根据选择的序列生成帧数据
function generateFrames () {
  frames.splice(0, frames.length) // 清空数组

  const colors = colorSequences[formData.selectedSequence]
  if (!colors)
    return

  setTimeout(() => {
    // 延迟生成DataURL，确保在浏览器环境中执行
    colors.forEach((color: string) => {
      const dataUrl = createColorDataUrl(color, formData.frameWidth, formData.frameHeight)
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

// 当表单数据变化时，重新生成帧
function handleFormDataChange (event: SetDataEvent) {
  const key = event.k
  setData(formData, event)
  // 当影响帧生成的属性变化时，重新生成帧
  if ([
    'selectedSequence',
    'frameWidth',
    'frameHeight',
  ].includes(key)) {
    generateFrames()
  }
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
        :frame-rate="formData.frameRate"
        :loop="formData.loop"
      />
    </div>

    <!-- 播放控制区域 -->
    <div class="control-section">
      <h4>播放控制</h4>
      <ElSpace>
        <ElButton type="success" @click="play">
          播放
        </ElButton>
        <ElButton type="warning" @click="pause">
          暂停
        </ElButton>
        <ElButton type="danger" @click="stop">
          停止
        </ElButton>
      </ElSpace>
      <div style="margin-top: 8px;">
        <ElText>当前状态: {{ statusText }}</ElText>
      </div>
    </div>

    <!-- 配置表单 -->
    <div class="form-section">
      <h4>配置参数</h4>
      <VkfForm
        :data="formData"
        :form-items="formItems"
        label-width="120px"
        @set-data="handleFormDataChange"
      />
    </div>

    <!-- 信息显示 -->
    <div class="info-section">
      <h4>帧数据信息</h4>
      <ElSpace direction="vertical">
        <ElTag>当前序列: {{ formData.selectedSequence }}</ElTag>
        <ElTag type="info">
          帧数量: {{ frames.length }}
        </ElTag>
        <ElTag type="success">
          帧率: {{ formData.frameRate }} FPS
        </ElTag>
        <ElTag :type="formData.loop ? 'warning' : 'info'">
          循环播放: {{ formData.loop ? '开启' : '关闭' }}
        </ElTag>
      </ElSpace>
    </div>
  </div>
</template>
