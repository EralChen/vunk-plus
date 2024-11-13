<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { useVditor, useVditorMitter } from './use'
import { watchPausable } from '@vueuse/core'
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: {
    'update:modelValue': null,
  },
  setup (props, { emit }) {

    const vditor = useVditor()
    const mitter = useVditorMitter()

    if (props.modelValue) {
      vditor.setValue(props.modelValue, true)
    }

    // 程序修改value
    const { pause, resume } = watchPausable(() => props.modelValue, (value) => {
      vditor.setValue(value, true)
    })

    // 用户输入
    mitter.on('input', (value) => {
      pause()
      emit('update:modelValue', value)
      nextTick(resume)
    })



    return () => null
  },
})
</script>
