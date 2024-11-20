<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    to: {
      type: String,
      default: '',
    },
  },
})
</script>
<template>
  <a 
    class="menu-link"
    :href="to"
  >
    {{ to }}
  </a>
</template>

