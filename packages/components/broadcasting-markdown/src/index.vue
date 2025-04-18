<script lang="ts">
import type { SetDataEvent } from '@vunk/core'
import type { Ref } from 'vue'
import type { Paragraph } from './types'
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
import { setData } from '@vunk/core'
import { computed, defineComponent, ref, watch } from 'vue'
import { Broadcast, ParagraphStatus } from './const'
import { emits, props } from './ctx'
import ParagraphView from './paragraph.vue'
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
    const _data = ref([]) as Ref<Paragraph[]>
    const theData = computed(() => {
      return props.data ?? _data.value
    })
    const handleSetData = (e: SetDataEvent) => {
      if (props.data === undefined) {
        setData(_data.value, e)
        return
      }
      emit('setData', e)
    }

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
      if (theData.value.length === 0) {
        return ''
      }

      // 首句未开始直接为空
      if (
        theData.value[0].broadcast === Broadcast.initial
        || theData.value[0].broadcast === Broadcast.failed
      ) {
        return ''
      }

      return theData.value
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
      const lastParagraph = theData.value.at(-1)

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
              // 上一段落已经在处理中, 无需合并 separator
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
            handleSetData({
              k: theData.value.length,
              v: paragraph,
            })
          }
        }
      }

      if (currentIndex.value < props.source.length) {
        currentIndex.value++
        setTimeout(write, props.delay)
      }
      else { // 游标完成阅读, 对最后一个段落进行处理
        isFinished.value = true

        if (lastParagraph?.end === currentIndex.value) {
          return
        }

        // 有未完成的段落
        const start = lastParagraph?.end ?? 0
        const end = currentIndex.value
        const value = props.source.slice(start, end)
        if (
          lastParagraph
          && lastParagraph.status === ParagraphStatus.initial
          && lastParagraph.separator === ''
        ) {
          lastParagraph.end = end
          lastParagraph.value = props.source.slice(
            lastParagraph.start,
            end,
          )
          lastParagraph.separator = ''
        }
        else {
          const paragraph = {
            start,
            separator: '',
            end,
            status: ParagraphStatus.initial,
            value,
            broadcast: Broadcast.initial,
          }
          handleSetData({
            k: theData.value.length,
            v: paragraph,
          })
        }
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
      theData,
      ParagraphStatus,
      fulfilledTextValue,
    }
  },
})
</script>

<template>
  <slot :paragraphs="theData">
    <VkTypingMarkdown
      :source="fulfilledTextValue"
      :delay="200"
      :pause="pause"
    ></VkTypingMarkdown>
  </slot>

  <ParagraphView
    v-for="(item, index) of theData"
    :key="item.value"
    v-model:status="item.status"
    :enable="theData[index - 1]
      ? theData[index - 1].status === ParagraphStatus.fulfilled
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
        ></WebSpeechView>
      </slot>
    </template>
  </ParagraphView>
</template>
