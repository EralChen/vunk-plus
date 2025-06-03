<script lang="ts" setup>
import type { SetDataEvent } from '@vunk/core'
import type { __VkfForm } from '@vunk/form'
import { VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { VkfForm } from '@vunk/form'
import { TickerStatus } from '@vunk/shared/enum'
import { ElButton, ElSpace, ElTag } from 'element-plus'
import { computed, reactive, ref } from 'vue'

// 动画状态控制
const status = ref<TickerStatus>(TickerStatus.pending)

// 表单数据
const formData = reactive({
  loop: true,
  frameRate: 24,
})

// 测试用的APNG URL
const base = import.meta.env.BASE_URL || '/'
const apngUrl = `${base}metahuman/M_SILENT.png`

// 表单项配置
const formItems: __VkfForm.FormItem[] = [
  {
    label: '帧率控制',
    prop: 'frameRate',
    templateType: 'VkfSlider',
    min: 1,
    max: 60,
    showStops: true,
    marks: {
      12: '12',
      24: '24',
      30: '30',
      60: '60',
    },
  },
  {
    label: '循环播放',
    prop: 'loop',
    templateType: 'VkfSwitch',
  },
]

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

// 处理表单数据变化
function handleFormDataChange (event: SetDataEvent) {
  setData(formData, event)
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
          :loop="formData.loop"
          :frame-rate="formData.frameRate"
        />
      </div>

      <div class="controls">
        <!-- 状态信息 -->
        <div class="status-info">
          <h4>状态信息</h4>
          <ElSpace direction="vertical">
            <ElTag>当前状态: {{ statusText }}</ElTag>
            <ElTag :type="formData.loop ? 'success' : 'info'">
              循环播放: {{ formData.loop ? '开启' : '关闭' }}
            </ElTag>
            <ElTag type="warning">
              帧率: {{ formData.frameRate }} FPS
            </ElTag>
            <ElTag type="info">
              APNG URL: {{ apngUrl }}
            </ElTag>
          </ElSpace>
        </div>

        <!-- 播放控制按钮 -->
        <div class="control-section">
          <h4>播放控制</h4>
          <ElSpace>
            <ElButton
              type="success"
              :disabled="status === TickerStatus.playing"
              @click="play"
            >
              播放
            </ElButton>
            <ElButton
              type="warning"
              :disabled="status !== TickerStatus.playing"
              @click="pause"
            >
              暂停
            </ElButton>
            <ElButton
              type="danger"
              :disabled="status === TickerStatus.pending"
              @click="stop"
            >
              停止
            </ElButton>
          </ElSpace>
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
      </div>
    </div>
  </div>
</template>
