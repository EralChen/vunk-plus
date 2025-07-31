<script lang="ts" setup>
import { rApplicationProfile } from './api'
import { initApplicationProfile } from './use'

const props = defineProps({
  accessToken: {
    type: String,
    required: true,
  },
})

const profile = await rApplicationProfile({
  access_token: props.accessToken,
})
initApplicationProfile(profile)
</script>

<template>
  <slot
    :id="profile.id"
    :stt_model_enable="profile.stt_model_enable"
  ></slot>
</template>
