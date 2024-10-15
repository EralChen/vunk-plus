
import { LoadEvent } from './types'

export const props = {
  path: {
    type: String,
    default: '',
  },
}

export const emits = {
  load: (e: LoadEvent) => e,

}