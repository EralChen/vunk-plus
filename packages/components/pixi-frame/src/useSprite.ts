import { Sprite } from 'pixi.js'
import { onBeforeUnmount } from 'vue'
import { usePixiApp } from './use'

export function useSprite (options: {
  autoResize?: boolean
}) {
  const autoResize = options.autoResize ?? true
  const { application: app, context } = usePixiApp()
  const sprite = new Sprite()
  app.stage.addChild(sprite)

  autoResize && context.when().then((app) => {
    if (sprite.texture) {
      resizeSprite()
      app.renderer.on('resize', resizeSprite)
    }
  })

  function resizeSprite () {
    if (!app.renderer?.screen)
      return
    // === 设置 sprite 尺寸自适应 ===
    const scaleX = app.screen.width / sprite.texture.width
    const scaleY = app.screen.height / sprite.texture.height
    const scale = Math.min(scaleX, scaleY) // 保持比例
    sprite.scale.set(scale)
    // 居中显示
    sprite.x = (app.screen.width - sprite.width) / 2
    sprite.y = (app.screen.height - sprite.height) / 2
  }

  onBeforeUnmount(() => {
    app.renderer.off('resize', resizeSprite)
    app.stage.removeChild(sprite)
  })

  return {
    sprite,
    resizeSprite,
  }
}
