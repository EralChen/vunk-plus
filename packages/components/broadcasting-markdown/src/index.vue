<script lang="ts">
import type { Paragraph } from './types'
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
import { setData } from '@vunk/core'
import { useDataComputed } from '@vunk/core/composables'
import { blobToDataURL } from '@vunk/shared/data/blob'
import { TickerStatus } from '@vunk/shared/enum'
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import { Broadcast, ParagraphStatus } from './const'
import { emits, props } from './ctx'
import HowlerSpeechView from './howler-speech.vue'
import ParagraphView from './paragraph.vue'

export default defineComponent({
  name: 'VkBroadcastingMarkdown',
  components: {
    ParagraphView,
    VkTypingMarkdown,
    HowlerSpeechView,
  },
  props,
  emits,
  setup (props, { emit, expose, slots }) {
    // 经过的段落
    const [theData, handleSetData] = useDataComputed({
      default: [] as Paragraph[],
    }, props, emit)

    const addParagraph = (paragraph: Paragraph) => {
      const k = theData.value.length
      handleSetData({
        k,
        v: paragraph,
      })
    }

    const processingParagraph = (
      paragraph: Paragraph,
    ) => {
      if (!props.textToSpeech) {
        return
      }
      const value = props.render(paragraph.value)
      if (!value) {
        return
      }
      return props.textToSpeech(`${value}`)
        .then(async (res) => {
          if (res instanceof Blob) {
            paragraph.blob = res
            paragraph.url = await blobToDataURL(res)
          }
          if (typeof res === 'string') {
            paragraph.url = res
          }
        })
        .then(async () => {
          await props.processing?.(paragraph)
        })
    }

    // 阅读游标
    const currentIndex = ref(0)
    // 当前游标是否完成
    const isFinished = computed(() => {
      return currentIndex.value >= props.source.length
    })

    const currentText = computed(() => {
      return props.source.substring(0, currentIndex.value)
    })

    const fulfilledTextValue = computed(() => {
      if (theData.value.length === 0) {
        return '......'
      }

      if (theData.value[0].broadcast === Broadcast.failed) {
        return ''
      }

      // 首句未开始直接为空
      if (
        theData.value[0].broadcast === Broadcast.pending
      ) {
        return '......'
      }

      return theData.value
        .filter(
          item => item.status === ParagraphStatus.fulfilled
            || item.status === ParagraphStatus.pending,
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

    // 如果未完成触发 写入
    watch(isFinished, (val) => {
      !val && write()
    }, { immediate: true })

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
          else if (value.length > props.paragraphMinlength) {
            const paragraph = {
              start,
              separator,
              end,
              status: ParagraphStatus.initial,
              value,
              broadcast: Broadcast.pending,
            }
            addParagraph(paragraph)
          }
        }
      }

      if (currentIndex.value < props.source.length) {
        currentIndex.value++
        setTimeout(write, props.delay)
      }
      else {
        if (props.keepRead) {
          // 如果没有完成阅读, 持续写入状态
          setTimeout(write, props.delay)
          return
        }

        // 游标完成阅读, 对最后一个段落进行处理
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
            broadcast: Broadcast.pending,
          }
          addParagraph(paragraph)
        }
      }
    }

    /* 打断当前播报 */
    const isInterrupted = ref(false)
    function interrupt () {
      isInterrupted.value = true
      theData.value.forEach((item) => {
        item.broadcast = Broadcast.stop
      })
      emit('interrupt')
    }
    /* 打断当前播报 END */

    /* 收集段落状态 */
    const currentParagraph = computed(() => {
      return theData.value.find(
        item => item.status === ParagraphStatus.pending,
      )
    })

    watchEffect(() => {
      if (!currentParagraph.value) {
        return
      }
      if (currentParagraph.value.broadcast === props.status) {
        return
      }
      props.status === TickerStatus.play && (currentParagraph.value.broadcast = TickerStatus.play)
      props.status === TickerStatus.pause && (currentParagraph.value.broadcast = TickerStatus.pause)
      props.status === TickerStatus.stop && (currentParagraph.value.broadcast = TickerStatus.stop)
    })

    const isPaused = computed(() => {
      return theData.value.some(
        item => item.status === ParagraphStatus.pending
          && item.broadcast === Broadcast.paused,
      )
    })
    watchEffect(() => {
      isPaused.value && emit('update:status', TickerStatus.paused)
    })

    const isBroadcasting = computed(() => {
      return theData.value.some(
        item => item.broadcast === Broadcast.playing,
      )
    })
    watchEffect(() => {
      isBroadcasting.value && emit('update:broadcasting', isBroadcasting.value)
      emit('update:status', TickerStatus.playing)
    })

    const isTypingFinished = ref(!!slots.paragraphs)
    const isCompleted = computed(() => {
      return isTypingFinished.value && props.keepRead === false && theData.value.every(
        item => item.status === ParagraphStatus.fulfilled,
      )
    })

    watchEffect(() => {
      emit('update:completed', isCompleted.value)
      isCompleted.value && emit('update:status', TickerStatus.stopped)
    })

    const isError = computed(() => {
      return theData.value.some(
        item => item.status === ParagraphStatus.rejected,
      )
    })
    watchEffect(() => {
      emit('update:error', isError.value)
    })

    function isPrevParagraphFulfilled (currentIndex: number) {
      return theData.value[currentIndex - 1]
        ? [
          ParagraphStatus.fulfilled,
        ].includes(theData.value[currentIndex - 1].status)
        : true
    }
    function isParagraphEnabled (currentIndex: number) {
      // 上一段完成
      const isPrevFulfilled = isPrevParagraphFulfilled(currentIndex)
      return isPrevFulfilled
    }
    /* 收集段落状态 END */

    expose({
      interrupt,
    })

    return {
      theData,
      ParagraphStatus,
      fulfilledTextValue,
      isPrevParagraphFulfilled,
      isParagraphEnabled,
      processingParagraph,
      isInterrupted,
      setData,
      Broadcast,
      isPaused,
      isTypingFinished,
      currentParagraph,
    }
  },
})
</script>

<template>
  <slot :paragraphs="theData">
    <VkTypingMarkdown
      v-model:finished="isTypingFinished"
      :source="fulfilledTextValue"
      :delay="120"
      :pause="isInterrupted || isPaused"
    ></VkTypingMarkdown>
    <ElButton @click="() => console.log(currentParagraph)">
      log2
    </ElButton>
  </slot>

  <ParagraphView
    v-for="(item, index) of theData"
    :key="item.value"
    v-model:status="item.status"
    :enable="isParagraphEnabled(index)"
    :processing="() => processingParagraph(item)"
  >
    <template #default="{ deferred }">
      <slot
        name="paragraph"
        :data="item"
        :deferred="deferred"
      >
        <HowlerSpeechView
          :render="render"
          :deferred="deferred"
          :data="item"
          @set-data="setData(item, $event)"
          @load="$emit('paragraphLoad', $event)"
        >
        </HowlerSpeechView>
      </slot>
    </template>
  </ParagraphView>
</template>
