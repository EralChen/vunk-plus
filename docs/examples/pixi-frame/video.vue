<script lang="ts" setup>
import type { SetDataEvent } from '@vunk/core'
import type { __VkfForm } from '@vunk/form'
import { VkPixiFrame } from '@vunk-plus/components/pixi-frame'
import { setData } from '@vunk/core'
import { VkfForm } from '@vunk/form'
import { TickerStatus } from '@vunk/shared/enum'
import { ElButton } from 'element-plus'
import { computed, reactive, ref } from 'vue'

// 状态管理
const status = ref(TickerStatus.pending)
const base = import.meta.env.BASE_URL || '/'

// 表单数据
const formData = reactive({
  loop: false,
  videoUrl: `${base}metahuman/F_SLT.mp4`,
})

// 可选的视频 URL 列表
const videoOptions = [
  {
    label: '视频 1 (F_SLT.mp4)',
    value: `${base}metahuman/F_SLT.mp4`,
  },
  {
    label: '视频 2 (F_SPK.mp4)',
    value: `${base}metahuman/F_SPK.mp4`,
  },
]

// 表单项配置
const formItems: __VkfForm.FormItem[] = [
  {
    label: '循环播放',
    prop: 'loop',
    templateType: 'VkfSwitch',
    activeText: '开启',
    inactiveText: '关闭',
  },
  {
    label: '视频源',
    prop: 'videoUrl',
    templateType: 'VkfSelect',
    options: videoOptions.map(option => ({
      label: option.label,
      value: option.value,
    })),
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

// 表单数据更新处理
function handleFormDataChange (event: SetDataEvent) {
  setData(formData, event)
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
    <h3>PIXI 视频播放器演示</h3>

    <div class="demo-container">
      <!-- 视频播放器 -->
      <div class="video-container">
        <VkPixiFrame
          v-model:status="status"
          :url="formData.videoUrl"
          :loop="formData.loop"
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
          <VkfForm
            :data="formData"
            :form-items="formItems"
            label-width="120px"
            @set-data="handleFormDataChange"
          />
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
              <span class="value">{{ formData.loop ? '是' : '否' }}</span>
            </div>
            <div class="info-item">
              <span class="label">视频源:</span>
              <span class="value">{{ formData.videoUrl }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
