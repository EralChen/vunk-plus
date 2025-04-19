<script lang="ts" setup>
import { Authentication } from '_c/authentication'
import { MetahumanBackground } from '_c/metahuman-background'
import { onErrorCaptured } from 'vue'
import Core from './core.vue'

defineProps({
  /**
   * @description /chat/{access_token}
   */
  accessToken: {
    type: String,
    required: true,
  },
})
onErrorCaptured((error) => {
  console.error(error)
})
</script>

<template>
  <Suspense>
    <Authentication :access-token="accessToken">
      <Core></Core>
    </Authentication>
    <template #fallback>
      <div pos-fixed inset-0>
        <MetahumanBackground
          v-loading="true"
        ></MetahumanBackground>
      </div>
    </template>
  </Suspense>
</template>
