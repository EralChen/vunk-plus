<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk-plus/components/bubble-list'
import type { BubbleList } from 'vue-element-plus-x'
import { useAgentChat } from '@vunk-plus/components/agent-chat-provider'
import { VkBubbleList } from '@vunk-plus/components/bubble-list'
import { VkRecorderButton } from '@vunk-plus/components/recorder-button'
import { VkSender } from '@vunk-plus/components/sender'
import { VkKeyboardAvatar } from '@vunk-plus/icons/keyboard'
import { VkVoiceAvatar } from '@vunk-plus/icons/voice'
import { VkDuplex } from '@vunk/core'
import { VkRendererData } from '@vunk/core/components/renderer-data'
import { useDataComputed, useDeferred } from '@vunk/core/composables'
import { computed, nextTick, ref } from 'vue'
import { InputType } from './const'
import { emits as dEmits, props as dProps } from './ctx'

defineOptions({
  name: 'VkIndependent',
})
const props = defineProps(dProps)
const emit = defineEmits(dEmits)

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

const lastBubbleData = computed(() => {
  const key = bubbleItems.value.at(-1)?.key
  if (key && bubbleData.value[key]) {
    return bubbleData.value[key]
  }
  return {}
})
const senderDisabled = computed(() => {
  if (lastBubbleData.value.error === true) {
    // 如果本条数据错误, 则开放输入
    return false
  }

  return bubbleItems.value.at(-1)?.loading === true
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
</script>

<template>
  <div class="vk-independent">
    <div ref="mainRef" class="vk-independent-main">
      <VkDuplex
        with-flex="one"
        class="vk-independent-main__duplex"
      >
        <template #one>
          <VkRendererData
            :data="bubbleData"
            @set-data="setBubbleData"
          >
            <div class="vk-independent-main__bubbles">
              <VkBubbleList
                :el-ref="bubbleListReslove"
                :items="bubbleItems"
              >
              </VkBubbleList>
            </div>
          </VkRendererData>
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
              :disabled="senderDisabled"
              :speech-to-text="speechToText"
              :submit-to-text="true"
              @submit-text="onSubmit"
            ></VkRecorderButton>
            <VkSender
              v-show="inputType === InputType.Text"
              v-model="content"
              :auto-size="true"
              placeholder="请输入内容"
              :disabled="senderDisabled"
              @submit="onSubmit"
            ></VkSender>
          </div>
        </template>
      </VkDuplex>
    </div>

    <div class="vk-independent-background">
      <slot name="background"></slot>
    </div>
  </div>
</template>

<style>
.vk-independent-main__bubbles {
   padding: 8px 8px 0 12px;
   height: 100%;
}

.vk-independent-main .el-bubble-content-wrapper .el-bubble-content-borderless{
  border: none;
}

.vk-independent-footer{
  display: flex;
  align-items: center;
  padding: var(--gap-s, 6px);
  background: var(--el-fill-color);
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
.vk-independent-main__duplex{
  height: 100%;
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
