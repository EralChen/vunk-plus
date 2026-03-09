<script lang="ts" setup>
import { VkThinking } from '@vunk-plus/components/thinking'
import { ref } from 'vue'

const content = ref(`
- **目标**：设计一个个人参加 HiCool 比赛的主题。
- **背景**：HiCool 是一场全球创业者峰会暨创业大赛（通常与北京/海淀相关）。它聚焦于科技创新、创业、全球化和未来趋势。
- **用户画像**：参赛的个人（可能是创始人、核心团队成员或创业者）。
- **所需输出**：一个主题（口号、概念或叙事框架）。
`)

const status = ref<'start' | 'thinking' | 'end' | 'error' | 'cancel'>('thinking')
const showSkip = ref(true)
const maxHeight = ref('200px')

function toggleStatus () {
  const statuses: ('start' | 'thinking' | 'end' | 'error' | 'cancel')[] = ['start', 'thinking', 'end', 'error', 'cancel']
  const index = statuses.indexOf(status.value)
  status.value = statuses[(index + 1) % statuses.length]
}

function appendContent () {
  content.value += '\n- **新增内容**：这是为了测试自动滚动功能而动态添加的一行文本。'
}
</script>

<template>
  <div style="padding: 20px;">
    <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
      <el-button @click="toggleStatus">
        切换状态 (当前: {{ status }})
      </el-button>
      <el-button @click="appendContent">
        追加内容 (测试滚动)
      </el-button>
      <el-switch v-model="showSkip" active-text="显示跳过按钮" />
    </div>

    <VkThinking
      :status="status"
      :content="content"
      title="分析用户需求"
      :max-height="maxHeight"
      :show-skip="showSkip"
    />
  </div>
</template>
