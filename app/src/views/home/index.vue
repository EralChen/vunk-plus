<script lang="ts" setup>
import { VkIndependent } from '@vunk-plus/components/independent'
import MetahumanBackground from '_c/metahuman-background/index.vue'
</script>

<template>
  <div h-full w-full>
    <VkIndependent class="home-independent">
      <template #background>
        <MetahumanBackground></MetahumanBackground>
      </template>
    </VkIndependent>
  </div>
</template>

<style>
.home-independent{
  overflow: hidden;
}
.home-independent .vk-independent-main__duplex{
  padding-top: 40vh;
}
.home-independent .el-bubble-list > .el-bubble:last-child {
  margin-bottom: 40px;
}
.home-independent .vk-independent-main__bubbles{

mask-image: linear-gradient(to bottom,
  rgba(0, 0, 0, 0.4),
  rgba(0, 0, 0, 1) 80%,
  rgba(0, 0, 0, 1) 100%
);

}
</style>
