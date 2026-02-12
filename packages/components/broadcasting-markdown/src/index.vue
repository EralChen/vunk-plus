<script lang="ts">
import type { Paragraph } from './types'
import { AsyncQueue } from '@sapphire/async-queue'
import { VkTypingMarkdown } from '@vunk-plus/components/typing-markdown'
import { setData } from '@vunk/core'
import { useDataComputed } from '@vunk/core/composables'
import { blobToDataURL } from '@vunk/shared/data/blob'
import { TickerStatus } from '@vunk/shared/enum'
import { computed, defineComponent, ref, watch } from 'vue'
import { Broadcast, ParagraphStatus } from './const'
import { emits, props } from './ctx'
import HowlerSpeechView from './howler-speech.vue'
import ParagraphView from './paragraph.vue'
import { resolveSeparatorParagraphActions, resolveTailParagraphAction } from './utils'

export default defineComponent({
  name: 'VkBroadcastingMarkdown',
  components: {
    ParagraphView,
    HowlerSpeechView,
    VkTypingMarkdown,
  },
  props,
  emits,
  setup (props, { emit }) {
    // 经过的段落
    const [theData, handleSetData] = useDataComputed({
      default: [] as Paragraph[],
    }, props, emit)

    const queue = new AsyncQueue()
    const addParagraph = (paragraph: Paragraph) => {
      const k = theData.value.length // 新增段落的索引
      if (k === 0) { // 第一个段落
        paragraph.broadcast = props.status
      }
      handleSetData({
        k,
        v: paragraph,
      })
    }

    const processingParagraph = async (paragraph: Paragraph) => {
      if (!props.textToSpeech) {
        return
      }
      const value = props.render(paragraph.value)
      if (props.separators.includes(value)) {
        return
      }

      if (!value) {
        return
      }

      const resPromise = props.textToSpeech(value)
      await queue.wait()
      return resPromise.then(async (res) => {
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
          queue.shift()
        })
    }

    // 阅读游标
    const currentIndex = ref(0)
    // 当前游标是否完成
    const isFinished = computed(() => {
      return currentIndex.value >= props.source.length
    })
    const fulfilledTextValue = computed(() => {
      if (props.disabled) {
        return props.source
      }
      return theData.value
        .filter(
          item => item.status === ParagraphStatus.fulfilled
            || item.status === ParagraphStatus.pending,
        )
        .map(item => item.value)
        .join('')
    })
    const sortedSeparators = computed(() => {
      return [...props.separators].sort((a, b) => {
        return a.length - b.length
      })
    })

    // 如果未完成触发 写入
    watch(isFinished, (val) => {
      if (props.disabled) {
        return
      }
      !val && write()
    }, { immediate: true })

    function write () { // 写入
      const lastParagraph = theData.value.at(-1)

      const separatorActions = resolveSeparatorParagraphActions({
        source: props.source,
        currentIndex: currentIndex.value,
        sortedSeparators: sortedSeparators.value,
        paragraphMinlength: props.paragraphMinlength,
        lastParagraph,
      })

      separatorActions.mergeActions.forEach((action) => {
        if (!lastParagraph) {
          return
        }
        lastParagraph.end = action.end
        lastParagraph.value = action.value
        lastParagraph.separator = action.separator
      })

      separatorActions.appendActions.forEach((action) => {
        addParagraph(action as Paragraph)
      })

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
        const tailAction = resolveTailParagraphAction({
          source: props.source,
          currentIndex: currentIndex.value,
          lastParagraph,
        })

        if (tailAction.type === 'none') {
          return
        }

        if (tailAction.type === 'merge') {
          if (!lastParagraph) {
            return
          }
          lastParagraph.end = tailAction.data.end
          lastParagraph.value = tailAction.data.value
          lastParagraph.separator = tailAction.data.separator
          return
        }

        addParagraph(tailAction.data as Paragraph)
      }
    }

    function isPrevParagraphFulfilled (currentIndex: number) {
      const last = theData.value[currentIndex - 1]
      return last
        ? last.status === ParagraphStatus.fulfilled
        : true
    }
    function isParagraphEnabled (currentIndex: number) {
      const isPrevFulfilled = isPrevParagraphFulfilled(currentIndex)
      return isPrevFulfilled
    }

    const currentPragraph = computed(() => {
      return theData.value.find(item => item.status === ParagraphStatus.pending)
    })

    watch(() => props.status, () => {
      if (props.status === TickerStatus.stop) {
        theData.value.forEach((item) => {
          if (item.broadcast !== TickerStatus.stopped) {
            item.broadcast = Broadcast.stop
          }
        })
      }
      if (!currentPragraph.value) {
        return
      }
      if (currentPragraph.value.broadcast !== props.status) {
        currentPragraph.value.broadcast = props.status
      }
    }, { immediate: true })

    // (e) => e === TickerStatus.stopped && deferred.resolve(true)
    function handleParagraphStatus (
      para: Paragraph,
      v: TickerStatus,
    ) {
      if (para.status === ParagraphStatus.pending) {
        emit('update:status', v)
      }
    }

    return {
      theData,
      ParagraphStatus,
      fulfilledTextValue,
      processingParagraph,
      setData,
      Broadcast,
      isParagraphEnabled,
      TickerStatus,
      handleParagraphStatus,
    }
  },
})
</script>

<template>
  <slot :paragraphs="theData">
    <VkTypingMarkdown
      :source="fulfilledTextValue"
    ></VkTypingMarkdown>
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
          v-model:status="item.broadcast"
          :source="item.url"
          @update:status="(e) => {
            handleParagraphStatus(item, e);
            e === TickerStatus.stopped && deferred.resolve(true);
            index === theData.length - 1 && e === TickerStatus.stopped && $emit('complete')
          }"

          @error="deferred.reject($event)"
          @load="$emit('paragraphLoad', {
            data: item,
            deferred,
          })"
        >
        </HowlerSpeechView>
      </slot>
    </template>
  </ParagraphView>
</template>
