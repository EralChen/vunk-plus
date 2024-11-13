import Vditor from 'vditor'
import { inject, Ref, unref } from 'vue'
import { Mitter } from './types'


export const useVditor = () => {
  const core = inject<Ref<Vditor>|null>('vkVditorRef', null)
  if (!core) {
    throw new Error('useVditor must be used after VditorProvider')
  }
  return unref(core)
}

export const useVditorMitter = () => {
  const core = inject<Mitter|null>('vkVditorMitter', null)
  if (!core) {
    throw new Error('useVditorMitter must be used after VditorProvider')
  }
  return core
}

