<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useVditor } from './use'
import { useMutationObserver } from '@vueuse/core'
export default defineComponent({
  props: {
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:fullscreen': null,
  },
  setup (props, { emit }) {
    const vditor = useVditor()
    const el  = vditor.vditor.element as HTMLDivElement

    const domFullscreen = ref(false)

    useMutationObserver(el, () => {
      if (el.classList.contains('vditor--fullscreen')) {
        domFullscreen.value = true
      } else {
        domFullscreen.value = false
      }
    }, {
      attributes: true,
    })

    watch(() => props.fullscreen, (value) => {
      if (value !== domFullscreen.value) { // 外部改变了 fullscreen
        const ir = vditor.vditor.ir?.element as HTMLElement

        if (!ir) return

        // 模拟键盘 <Crtl + '>  同时摁下退出全屏
        ir.dispatchEvent(new KeyboardEvent('keydown', {
          key: "'",
          ctrlKey: true,
        }))



      }
    }, { immediate: true })

    watch(() => domFullscreen.value, (value) => {
      emit('update:fullscreen', value)
    })




    return () => null
  },
})
</script>

