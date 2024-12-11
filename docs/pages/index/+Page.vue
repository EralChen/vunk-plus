<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { navigate } from 'vike/client/router'
export default defineComponent({
  setup () {

    onBeforeMount(() => {
      navigate(import.meta.env.BASE_URL + 'zh-CN/guide/introduction')
    })

    return () => null
  },
})
</script>