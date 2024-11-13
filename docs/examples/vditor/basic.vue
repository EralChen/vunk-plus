<script lang="ts" setup>
import { VkVditor } from '@vunk-plus/components/vditor'
import 'vditor/dist/index.css'
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  value:  {{ value }}
  
  <hr>
  
  <VkVditor
    v-model="value"
  ></VkVditor>
</template>