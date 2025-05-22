<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { __VkBubbleTemplates } from '@vunk-plus/components/bubble-templates'
import { useAgentChat } from '@vunk-plus/components/agent-chat-provider'
import { VkBubbleList } from '@vunk-plus/components/bubble-list'
import { VkSender } from '@vunk-plus/components/sender'
import { VkKeyboardAvatar } from '@vunk-plus/icons/keyboard'
import { VkVoiceAvatar } from '@vunk-plus/icons/voice'
import { VkDuplex } from '@vunk/core'
import { VkRendererData } from '@vunk/core/components/renderer-data'
import { useDataComputed, useDeferred } from '@vunk/core/composables'
import { isEmptyObject, isNotEmptyObject } from '@vunk/shared/object'
import { waiting } from '@vunk/shared/promise'
import { computed, defineAsyncComponent, nextTick, ref } from 'vue'
import { InputType } from './const'
import { emits as dEmits, props as dProps } from './ctx'

defineOptions({
  name: 'VkChatIndependent',
})

const props = defineProps(dProps)

const emit = defineEmits(dEmits)

const VkRecorderButton = defineAsyncComponent(() => import('@vunk-plus/components/recorder-button'))

const [bubbleData, setBubbleData] = useDataComputed<
  __VkBubbleList.RenderData
>({}, props, emit)

const mainRef = ref<HTMLElement>()
const inputType = ref<InputType>(InputType.Text)
const content = ref<string>('') // 输入框数据
const bubbleListDef = useDeferred<{
  scrollToBottom: () => void
}>()
const bubbleListReslove = bubbleListDef.resolve

const { simplicity } = useAgentChat()
const { items: bubbleItems, onRequest } = simplicity

const lastBubbleItem = computed(() => {
  return bubbleItems.value.at(-1)
})
const lastBubbleData = computed(() => {
  return getBubbleDataAt(-1)
})
const clientLoading = computed(() => {
  if (lastBubbleItem.value?.loading === true) { // 正在请求
    return true
  }
  if (
    isNotEmptyObject(lastBubbleData.value)
    && lastBubbleData.value.completed !== true
  ) { // 渲染未完成
    return true
  }
  return false
})
const senderDisabled = computed(() => {
  if (lastBubbleData.value.error === true) {
    // 如果本条数据错误, 则开放输入
    return false
  }
  return lastBubbleItem.value?.loading === true
    || lastBubbleData.value.completed === false
})

function onSubmit (nextContent: string) {
  if (!nextContent)
    return

  onRequest(nextContent)

  nextTick(() => {
    content.value = ''
  })

  setTimeout(() => {
    bubbleListDef.value?.scrollToBottom()
  }, 400)
}
function onCancel () {
  const lastBubble = bubbleItems.value.at(-1) as __VkBubbleList.Item
  if (!lastBubble)
    return
  lastBubble.abortController?.abort() // 打断请求

  waiting(() => bubbleData.value[lastBubble.key], 60)
    .then((lastBubbleData: __VkBubbleTemplates.RenderDataRecord) => {
      lastBubbleData.elRef?.interrupt() // 打断渲染
      bubbleData.value[lastBubble.key].completed = true
    })
}

/* utils */
function getBubbleDataAt (index: number) {
  const bubble = bubbleItems.value.at(index)
  if (bubble?.key && bubbleData.value[bubble.key]) {
    return bubbleData.value[bubble.key]
  }
  return {}
}
/* utils END  */
</script>

<template>
  <div class="vk-chat-independent">
    <div ref="mainRef" class="vk-chat-independent-main">
      <VkDuplex
        with-flex="one"
        class="vk-chat-independent-main__duplex"
      >
        <template #one>
          <VkRendererData
            :data="bubbleData"
            @set-data="setBubbleData"
          >
            <div class="vk-chat-independent-main__bubbles">
              <VkBubbleList
                :el-ref="bubbleListReslove"
                :items="bubbleItems"
                :text-to-speech="textToSpeech"
              >
                <template #renderer>
                  <slot name="bubble_renderer"></slot>
                </template>
                <template #footer="e">
                  <slot v-bind="e" name="bubble_footer"></slot>
                </template>
              </VkBubbleList>
            </div>
          </VkRendererData>
        </template>

        <template #two>
          <div class="vk-chat-independent-footer">
            <template v-if="speechToText">
              <VkKeyboardAvatar
                v-show="inputType === InputType.Voice"
                :size="40"
                @click="inputType = InputType.Text"
              ></VkKeyboardAvatar>
              <VkRecorderButton
                v-show="inputType === InputType.Voice"
                :append-to="mainRef"
                :disabled="senderDisabled"
                :speech-to-text="speechToText"
                :submit-to-text="true"
                @submit-text="onSubmit"
              ></VkRecorderButton>

              <VkVoiceAvatar
                v-show="inputType === InputType.Text"
                :size="40"
                @click="inputType = InputType.Voice"
              ></VkVoiceAvatar>
            </template>

            <VkSender
              v-show="inputType === InputType.Text"
              v-model="content"
              :auto-size="true"
              placeholder="请输入内容"
              :send-disabled="senderDisabled"
              :loading="clientLoading"
              @submit="onSubmit"
              @cancel="onCancel"
            ></VkSender>
          </div>
        </template>
      </VkDuplex>
    </div>

    <div class="vk-chat-independent-background">
      <slot name="background"></slot>
    </div>
  </div>
</template>

<style>
.vk-chat-independent-main__bubbles {
   padding: 8px 8px 0 12px;
   height: 100%;
}

.vk-chat-independent-main .el-bubble-content-wrapper .el-bubble-content-borderless{
  border: none;
}

.vk-chat-independent-footer{
  display: flex;
  align-items: center;
  padding: var(--gap-s, 6px);
  background: var(--el-fill-color);
}
.vk-chat-independent-footer .vk-recorder-container{
  flex-basis: 100%;
}
.vk-chat-independent-footer .el-avatar{
  cursor: pointer;
  align-self: flex-end;
}

.vk-chat-independent-footer .ant-sender{
  border-radius: var(--el-border-radius-base, 4px);
}

.vk-chat-independent-footer .ant-sender-content{
  padding: 4px;
  /* border-radius: 0; */

}

.vk-chat-independent{
  width: 100%;
  height: 100%;
  position: relative;
}
.vk-chat-independent-main__duplex{
  height: 100%;
}
.vk-chat-independent-main{
  z-index: 1;
  inset: 0;
  position: absolute;
}
.vk-chat-independent-background{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

}
</style>
