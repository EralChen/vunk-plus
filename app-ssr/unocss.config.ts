import { defineConfig } from 'unocss'
import { createUnocssSettings } from '@vunk/shared/vite/unocss'
// import { NormalObject } from '@vunk/shared'

/**
 * @link
 * https://eralchen.github.io/vunk-shared/zh-CN/vite/unocss/createUnocssSettings
 */
const settings = createUnocssSettings({
  presetFlexPrefix: 'sk',
  /**
   * @default 'g'
   * class="gmt-m"
   * if you want to use like `mt-m`, you can set it to `''`
   */
  presetGapPrefix: '',
})


// const theme = settings.theme as NormalObject
// theme['colors'].test = '#ff0000'

export default defineConfig(settings)