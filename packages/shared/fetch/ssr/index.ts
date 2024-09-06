import type { RestFetchRequest } from '@vunk/skzz/shared'
import { RestFetch } from '@vunk/core/shared/utils-fetch'

export const restFetch  = new RestFetch({
  baseURL: '',
})



export const request = <T>(...args: Parameters<RestFetchRequest>) => {
  const p = restFetch
    .request(...args) as unknown as Promise<T>

  return p
}

