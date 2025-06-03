import type { NormalObject } from '@vunk/shared'
import type { Resize } from './types'
import { Sprite } from 'pixi.js'
import { onBeforeUnmount, watchEffect } from 'vue'
import { usePixiApp } from './use'

export function useSprite (props: {
  autoResize?: boolean
  label?: string
  resize?: Resize
}) {
  const autoResize = props.autoResize ?? true
  const resize = props.resize ?? defaultResize
  const { application: app, context } = usePixiApp()
  const sprite = new Sprite()
  app.stage.addChild(sprite)

  watchEffect(() => {
    props.label && (sprite.label = props.label)
  })

  autoResize && context.when().then((app) => {
    if (sprite.texture) {
      resizeSprite()
      app.renderer.on('resize', resizeSprite)
    }
  })

  function resizeSprite () {
    if (!app.renderer?.screen)
      return
    const meta = (sprite.texture as NormalObject)._meta
    resize({
      application: app,
      sprite,
      meta,
    })
  }

  onBeforeUnmount(() => {
    app.renderer.off('resize', resizeSprite)
    app.stage.removeChild(sprite)
  })

  function defaultResize () {
    const scaleX = app.screen.width / sprite.texture.width
    const scaleY = app.screen.height / sprite.texture.height
    const scale = Math.min(scaleX, scaleY) // 保持比例
    sprite.scale.set(scale)
    // 居中显示
    sprite.x = (app.screen.width - sprite.width) / 2
    sprite.y = (app.screen.height - sprite.height) / 2
  }

  return {
    sprite,
    resizeSprite,
  }
}
