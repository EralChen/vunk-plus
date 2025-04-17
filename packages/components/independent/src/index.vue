<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import { Role, VkBubbleList } from '@vunk-plus/components/bubble-list'
import { VkRecorderButton } from '@vunk-plus/components/recorder-button'
import { VkSender } from '@vunk-plus/components/sender'
import { VkKeyboardAvatar } from '@vunk-plus/icons/keyboard'
import { VkVoiceAvatar } from '@vunk-plus/icons/voice'
import { VkDuplexCalc } from '@vunk/core'
import { computed, ref } from 'vue'
import { Bubble } from 'vue-element-plus-x'
import { InputType } from './const'
import { useAgentChat } from './use'

defineOptions({
  name: 'VkIndependent',
})
const mainRef = ref<HTMLElement>()
const inputType = ref<InputType>(InputType.Text)
const content = ref<string>('') // 输入框数据

const { simplicity } = useAgentChat()
// const { messages, parsedMessages } = chat
const { items: bubbleItems, onRequest } = simplicity

function onSubmit (nextContent: string) {
  if (!nextContent)
    return
  onRequest(nextContent)
  content.value = ''
}
</script>

<template>
  <div class="vk-independent">
    <div ref="mainRef" class="vk-independent-main">
      <VkDuplexCalc with-resize="one">
        <template #one>
          <div class="vk-independent-main__bubbles">
            <VkBubbleList
              :items="bubbleItems"
            >
            </VkBubbleList>
          </div>
        </template>

        <template #two>
          <div class="vk-independent-footer">
            <VkKeyboardAvatar
              v-show="inputType === InputType.Voice"
              :size="40"
              @click="inputType = InputType.Text"
            ></VkKeyboardAvatar>
            <VkVoiceAvatar
              v-show="inputType === InputType.Text"
              :size="40"
              @click="inputType = InputType.Voice"
            ></VkVoiceAvatar>

            <VkRecorderButton
              v-show="inputType === InputType.Voice"
              :append-to="mainRef"
            ></VkRecorderButton>
            <VkSender
              v-show="inputType === InputType.Text"
              v-model="content"
              :auto-size="true"
              placeholder="请输入内容"
              @submit="onSubmit"
            ></VkSender>
          </div>
        </template>
      </VkDuplexCalc>
    </div>

    <div class="vk-independent-background">
    </div>
  </div>
</template>

<style>
.vk-independent-main__bubbles {
   padding: var(--gap-s, 8px);
   height: 100%;
}

/* 去除边框 */
.vk-independent-main .el-bubble-content-wrapper .el-bubble-content-borderless{
  border: none;
}

.vk-independent-footer{
  display: flex;
  align-items: center;
}
.vk-independent-footer .vk-recorder-container{
  flex-basis: 100%;
}
.vk-independent-footer .el-avatar{
  cursor: pointer;
  align-self: flex-end;
}

.vk-independent-footer .ant-sender{
  border-radius: var(--el-border-radius-base, 4px);
}

.vk-independent-footer .ant-sender-content{
  padding: 4px;
  /* border-radius: 0; */

}

.vk-independent{
  width: 100%;
  height: 100%;
  position: relative;
}
.vk-independent-main{
  z-index: 1;
  inset: 0;
  position: absolute;
}
.vk-independent-background{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

}
</style>
