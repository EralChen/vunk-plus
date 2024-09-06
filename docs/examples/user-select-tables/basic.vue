<script lang="ts" setup>
import { SkUserSelectTables } from '@vunk-plus/components/user-select-tables'
import { ref } from 'vue'
import { User } from '@vunk-plus/api/user'

const currentUsers = ref<User[]>([])
</script>
<template>
  <p>currentUsers: {{ currentUsers }}</p>
  <SkUserSelectTables
    v-model="currentUsers"
  ></SkUserSelectTables>
</template>