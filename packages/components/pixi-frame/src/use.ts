import type { InjectionKey } from 'vue'
import { Application } from 'pixi.js'
import { inject, provide } from 'vue'

const appInjectKey = Symbol('appInjectKey') as InjectionKey<Application>

export function initPixiApp () {
  const app = new Application()
  provide(appInjectKey, app)
  return app
}

export function usePixiApp () {
  const app = inject(appInjectKey)
  if (!app) {
    throw new Error('Pixi app not provided')
  }
  return app
}
