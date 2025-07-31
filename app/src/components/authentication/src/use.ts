import type { ApplicationProfile } from './types'
import { inject, type InjectionKey, provide } from 'vue'

const applicationProfileInjectKey = Symbol('applicationProfileInjectKey') as InjectionKey<ApplicationProfile>

export function initApplicationProfile (
  profile: ApplicationProfile,
) {
  provide(applicationProfileInjectKey, profile)
}

export function useApplicationProfile () {
  const profile = inject(applicationProfileInjectKey)
  if (!profile) {
    throw new Error('useApplicationProfile must be used after initApplicationProfile')
  }
  return profile
}
