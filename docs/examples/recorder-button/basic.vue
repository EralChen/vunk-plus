<script lang="ts" setup>
import { VkRecorderButton } from '@vunk-plus/components/recorder-button'
import { ref } from 'vue'

const text = ref('')
function onSubmitText (v: string) {
  text.value = v
}
</script>

<template>
  <div h-400px>
    {{ text }}
  </div>
  <VkRecorderButton
    @submit-text="onSubmitText"
  ></VkRecorderButton>
</template>
