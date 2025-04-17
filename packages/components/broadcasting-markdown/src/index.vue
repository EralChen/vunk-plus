<script lang="ts">
import type { Ref } from 'vue'
import type { Paragraph } from './types'
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
import { computed, defineComponent, ref, watch } from 'vue'
import { Broadcast, ParagraphStatus } from './const'
import { emits, props } from './ctx'
import ParagraphView from './paragraph.vue'
import { useVoices } from './use'
import WebSpeechView from './web-speech.vue'

export default defineComponent({
  name: 'VkBroadcastingMarkdown',
  components: {
    ParagraphView,
    VkTypingMarkdown,
    WebSpeechView,
  },
  props,
  emits,
  setup (props, { emit }) {
    const { voices } = useVoices()
    const defaultVoice = computed(() => {
      return voices.value
        .filter(voice => voice.lang === 'zh-CN')[3]
    })

    // 阅读游标
    const currentIndex = ref(0)
    // 当前游标是否完成
    const isFinished = ref(false)

    const currentText = computed(() => {
      return props.source.substring(0, currentIndex.value)
    })

    // 经过的段落
    // const paragraphs = ref([]) as Ref<Paragraph[]>

    const fulfilledTextValue = computed(() => {
      if (props.data.length === 0) {
        return ''
      }

      // 首句未开始直接为空
      if (
        props.data[0].broadcast === Broadcast.initial
        || props.data[0].broadcast === Broadcast.failed
      ) {
        return ''
      }

      return props.data
        .filter(
          item => item.status !== ParagraphStatus.initial,
        )
        .map(item => item.value)
        .join('')
    })

    // props.separators 按长度升序排列
    const sortedSeparators = computed(() => {
      return [...props.separators].sort((a, b) => {
        return a.length - b.length
      })
    })

    write()
    function write () { // 写入
      const lastParagraph = props.data.at(-1)

      // 遇到标点符号 添加段落
      for (const separator of sortedSeparators.value) {
        const separatorLen = separator.length
        // 需要比对的文字
        const compareText = currentText.value.slice(
          currentIndex.value - separatorLen,
          currentIndex.value,
        )

        // 如果匹配到了
        if (compareText === separator) {
          const start = lastParagraph?.end ?? 0
          const end = currentIndex.value

          const value = props.source.slice(
            start,
            end,
          )
          if (
            lastParagraph && separator.length >= value.length
          ) { // 比如 separators 设置了 /n/n 和 /n, 在 /n/n 命中的时候, 直接加入 上个段落的 end
            if (
              lastParagraph.status === ParagraphStatus.initial
            ) {
              lastParagraph.end = end
              lastParagraph.value = props.source.slice(
                lastParagraph.start,
                end,
              )
              lastParagraph.separator = separator
            }
            else {
              // paragraphs.value.push({
              //   start: end - separatorLen,
              //   separator,
              //   end,
              //   status: ParagraphStatus.initial,
              //   value,
              // })
            }
          }
          else {
            const paragraph = {
              start,
              separator,
              end,
              status: ParagraphStatus.initial,
              value,
              broadcast: Broadcast.initial,
            }
            emit('setData', {
              k: props.data.length,
              v: paragraph,
            })
          }
        }
      }

      if (currentIndex.value < props.source.length) {
        currentIndex.value++
        setTimeout(write, props.delay)
      }
      else {
        isFinished.value = true
      }
    }

    watch(
      () => isFinished.value
        && currentIndex.value < props.source.length,
      () => { // 说明source变化了
        isFinished.value = false
        write()
      },
    )

    return {
      defaultVoice,
      ParagraphStatus,
      fulfilledTextValue,
    }
  },
})
</script>

<template>
  <slot :paragraphs="data">
    <VkTypingMarkdown
      :source="fulfilledTextValue"
      :delay="200"
      :pause="pause"
    ></VkTypingMarkdown>
  </slot>

  <ParagraphView
    v-for="(item, index) of data"
    :key="item.value"
    v-model:status="item.status"
    :enable="data[index - 1]
      ? data[index - 1].status === ParagraphStatus.fulfilled
      : true
    "
  >
    <template #default="{ deferred }">
      <slot
        name="paragraph"
        :data="item"
        :deferred="deferred"
      >
        <WebSpeechView
          :pause="pause"
          :deferred="deferred"
          :data="item"
          :voice="defaultVoice"
        ></WebSpeechView>
      </slot>
    </template>
  </ParagraphView>
</template>
