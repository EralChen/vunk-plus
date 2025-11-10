<script lang="ts" setup>
import { ArrowDownBold, ArrowLeftBold, ArrowRightBold, ArrowUpBold } from '@element-plus/icons-vue'
import { noop } from '@vunk/shared/function'
import { ElDrawer, ElIcon } from 'element-plus'
import { computed, ref, watchEffect } from 'vue'
import { createElDrawerBindProps, createElDrawerOnEmits, props as dprops, emits } from './ctx'

const props = defineProps(dprops)
const emit = defineEmits(emits)

const hasToggle = computed(() => props.modules.includes('toggle'))

const coreProps = createElDrawerBindProps(props)
const coreEmits = createElDrawerOnEmits(emit)

const isClosed = ref(!props.modelValue)
watchEffect(() => {
  noop(props.modelValue)

  setTimeout(() => {
    isClosed.value = !props.modelValue
  }, 0)
})
</script>

<template>
  <ElDrawer
    v-bind="coreProps"
    :modal-class="[
      'vk-drawer-modal', modalClass,
      absolute ? 'is-absolute' : '',
      modal ? '' : 'no-modal',
      isClosed ? 'is-closed' : 'is-opened',
      `is-${direction}`,

    ].filter(Boolean).join(' ')"
    v-on="coreEmits"
  >
    <template #default>
      <slot name="default"></slot>
      <div
        v-if="hasToggle"
        class="vk-drawer-toggle"
        :class="`is-${direction}`"
        @click="$emit('update:modelValue', !modelValue)"
      >
        <slot
          name="toggle"
          :model-value="modelValue"
          :direction="direction"
        >
          <ElIcon>
            <ArrowRightBold
              v-if="(direction === 'rtl' && modelValue)
                || (direction === 'ltr' && !modelValue)"
            />
            <ArrowLeftBold
              v-else-if="(direction === 'rtl' && !modelValue)
                || (direction === 'ltr' && modelValue)"
            />
            <ArrowDownBold
              v-else-if="(direction === 'ttb' && modelValue)
                || (direction === 'btt' && !modelValue)"
            />
            <ArrowUpBold
              v-else-if="(direction === 'ttb' && !modelValue)
                || (direction === 'btt' && modelValue)"
            />
          </ElIcon>

          <slot name="toggle_text"></slot>
        </slot>
      </div>
    </template>
  </ElDrawer>
</template>

<style>
.vk-drawer-modal.is-closed {
  display: block!important; /* 保持抽屉关闭时，toggle 仍然可见 */
  visibility: hidden; /* 抽屉本体不可见 */
}

.vk-drawer-modal.is-closed .el-drawer.rtl {
  transform: translateX(100%); /* 抽屉本体移出可视区域 */
}
.vk-drawer-modal.is-closed .el-drawer.ltr {
  transform: translateX(-100%); /* 抽屉本体移出可视区域 */
}
.vk-drawer-modal.is-closed .el-drawer.ttb {
  transform: translateY(-100%); /* 抽屉本体移出可视区域 */
}
.vk-drawer-modal.is-closed .el-drawer.btt {
  transform: translateY(100%); /* 抽屉本体移出可视区域 */
}

.vk-drawer-modal .vk-drawer-toggle {
  visibility: visible; /* 保持 toggle 可见 */
}

.vk-drawer-modal.is-absolute{
  position: absolute!important;
}
.vk-drawer-modal.is-absolute.no-modal {
  pointer-events: none;
}
.vk-drawer-modal.is-absolute.no-modal  .el-drawer  {
  pointer-events: initial;
}

.vk-drawer-toggle {
  position: absolute;
  z-index: 2;

  /* 尺寸 */
  width: 40px;
  height: 80px;

  /* 布局 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 交互 */
  cursor: pointer;
  user-select: none;

  /* 文字样式 */
  color: var(--el-text-color-primary);
}

.vk-drawer-toggle.is-rtl {

  /* 位置 */
  top: 25%;
  left: 0;
  transform: translate(-100%, 0);

  /* 外观 */
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-right: none; /* 右侧不要边框，因为贴着 drawer */

  /* 圆角 */
  border-top-left-radius: var(--el-border-radius-base);
  border-bottom-left-radius: var(--el-border-radius-base);

  /* 文字排列 */
  writing-mode: vertical-rl; /* 竖向文字 */

}

.vk-drawer-toggle.is-ltr {

  /* 位置 */
  top: 25%;
  right: 0;
  transform: translate(100%, 0);

  /* 外观 */
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-left: none; /* 左侧不要边框，因为贴着 drawer */

  /* 圆角 */
  border-top-right-radius: var(--el-border-radius-base);
  border-bottom-right-radius: var(--el-border-radius-base);

  /* 文字排列 */
  writing-mode: vertical-rl; /* 竖向文字 */

}

.vk-drawer-toggle.is-ttb {

  /* 位置 */
  bottom: 0;
  left: 25%;
  transform: translate(0, 100%);

  /* 外观 */
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-top: none; /* 上侧不要边框，因为贴着 drawer */

  /* 圆角 */
  border-bottom-left-radius: var(--el-border-radius-base);
  border-bottom-right-radius: var(--el-border-radius-base);
}

.vk-drawer-toggle.is-btt {

  /* 位置 */
  top: 0;
  left: 25%;
  transform: translate(0, -100%);

  /* 外观 */
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-bottom: none; /* 下侧不要边框，因为贴着 drawer */

  /* 圆角 */
  border-top-left-radius: var(--el-border-radius-base);
  border-top-right-radius: var(--el-border-radius-base);
}

.vk-drawer-toggle:hover {
  background-color: var(--el-fill-color-light);
}

.vk-drawer-toggle:active {
  background-color: var(--el-fill-color);
}
</style>
