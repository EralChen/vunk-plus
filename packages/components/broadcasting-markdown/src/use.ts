import { onMounted, shallowRef } from 'vue'

export function useVoices () {
  /* 浏览器语音列表 */
  const voices = shallowRef<SpeechSynthesisVoice[]>([])

  onMounted(() => {
    rPopulateVoiceList()
    window.speechSynthesis.onvoiceschanged = rPopulateVoiceList
  })
  function rPopulateVoiceList () {
    if (typeof window.speechSynthesis === 'undefined') {
      return
    }
    voices.value = window.speechSynthesis.getVoices()
  }

  return {
    voices,
  }
}
