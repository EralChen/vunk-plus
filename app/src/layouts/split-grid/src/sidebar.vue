<script lang="ts" setup>
import { ref, Teleport } from 'vue'
</script>

<template>
  <Teleport to="#layout-split-grid-sidebar">
    <slot></slot>
  </Teleport>
</template>
