<script lang="ts" setup>
import type {

  __VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import {
  Broadcast,
  VkBroadcastingMarkdown,
} from '@vunk-plus/components/broadcasting-markdown'
import { setData } from '@vunk/core'
import { computed, ref } from 'vue'
import { MetahumanStatus } from './metahuman-background/const'
import MetahumanBackground from './metahuman-background/index.vue'

const text = `下面是一篇约 800 字的童话故事，适合儿童阅读：

---

**《月光下的小狐狸》**

在一片遥远的森林里，住着一只聪明又可爱的小狐狸，名字叫星星。星星的毛发雪白，眼睛像两颗黑宝石，每到晚上，她最喜欢躺在山顶上看星星，数着一颗又一颗，直到睡着。

森林里的动物们都很喜欢星星，因为她聪明、善良，还总是乐于助人。谁家的果子摘不到了，星星就爬树帮忙；谁不小心掉进小河里了，星星就带来藤蔓，把他们拉上岸。

有一天，森林里来了一个奇怪的声音——“咚……咚……咚……”那声音低沉而遥远，仿佛从地底深处传来。动物们吓坏了，全都躲在洞里不敢出来。

星星决定查清楚声音的来源。她背上小背包，带着干粮和水，悄悄地顺着声音前进。她穿过密林，跳过小溪，一直来到一座从未见过的山脚下。

这座山叫“沉睡山”，据说里面住着一只古老的龙。没人见过它，但大家都说，那是一只被诅咒的龙，永远不能醒来。

星星靠近山洞时，声音更大了，“咚……咚……”她鼓起勇气走了进去。洞里阴冷而安静，只有岩石偶尔滴水的声音。

终于，她看见了一条巨大的龙，它全身是银灰色的，眼睛紧闭，胸口慢慢起伏。那声音，正是它沉重的呼吸声。

“你……还好吗？”星星轻声问。

龙没有回答。但她看到，龙的爪子上缠着一条发光的锁链。那锁链发出微微的蓝光，好像是某种魔法。

星星不忍心离开，她决定帮助这条龙。

第二天清晨，她回到森林，去请教最年长的猫头鹰先生。猫头鹰听完，点点头，说：“这是千年前的封印，只有真正善良且勇敢的心，才能解开。”

星星又去拜访了山猫奶奶，找来了三种草药；又向啄木鸟借来了它最尖的喙。她用草药煮成药水，用啄木鸟的喙蘸着画成古老的图腾，围绕着锁链。

在月光最亮的夜晚，星星再次回到沉睡山。她对龙说：“我不知道你为什么被封印，但我相信你不是坏的。”

说完，她将药水泼在锁链上，大声喊出图腾的名字。

“咔哒！”

锁链碎裂的声音回荡在山洞里，紧接着，银色巨龙睁开了眼睛。

它缓缓低下头，说：“谢谢你，小狐狸。我终于自由了。”

星星问：“你……现在要离开了吗？”

龙笑了笑：“不，我要守护这片森林，保护你们，就像你保护了我。”

从那天起，森林上空多了一位守护者，而小狐狸星星也成了森林里的传说。

每当月光洒在山顶，总有动物悄悄仰望夜空，想起那只勇敢善良的小狐狸——在月光下，像一颗最亮的星星。

---

如果你需要不同风格的版本，比如现代童话、科幻童话、寓言体等，修仙的人，我也可以为你创作。你想尝试哪种风格？`

const paragraphs = ref<__VkBroadcastingMarkdown.Paragraph[]>([])

const metahumanStatus = computed(() => {
  const speaking = paragraphs.value.some((item) => {
    return item.broadcast === Broadcast.playing
  })
  return speaking
    ? MetahumanStatus.SPEAKING
    : MetahumanStatus.SILENT
})

const currentIndex = ref(0)
const theText = computed(() => {
  return text.substring(0, currentIndex.value)
})
const pause = ref(true)

setInterval(() => {
  if (currentIndex.value < text.length) {
    currentIndex.value += 3
  }
}, 500)
</script>

<template>
  <ElButton @click="pause = !pause">
    {{ pause ? '继续' : '暂停' }}
  </ElButton>

  <div h-600px>
    <MetahumanBackground
      :status="metahumanStatus"
    >
      <div
        pos-absolute bottom-0 z-2 top-350px bg-white
        left-0 right-0
      >
        <ElScrollbar w-full>
          <VkBroadcastingMarkdown
            :data="paragraphs"
            :source="theText"
            :pause="pause"
            @set-data="setData(paragraphs, $event)"
          >
          </VkBroadcastingMarkdown>
        </ElScrollbar>
      </div>
    </MetahumanBackground>
  </div>
</template>
