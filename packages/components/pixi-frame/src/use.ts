import type { InjectionKey } from 'vue'
import { Deferred } from '@vunk/shared/promise'
import { Application } from 'pixi.js'
import { inject, provide } from 'vue'

const appInjectKey = Symbol('appInjectKey') as InjectionKey<{
  application: Application
  context: {
    whenDef: Deferred<Application>
    when: () => Promise<Application>
  }
}>

export function initPixiApp () {
  const application = new Application()
  const whenDef = new Deferred<Application>()

  const context = {
    whenDef,
    when: () => whenDef.promise,
  }
  provide(appInjectKey, {
    application,
    context,
  })

  return { application, context }
}

export function usePixiApp () {
  const core = inject(appInjectKey)
  if (!core) {
    throw new Error('Pixi app not provided')
  }
  return core
}
