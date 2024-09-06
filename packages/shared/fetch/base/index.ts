import type { RestFetchRequest } from '@vunk/skzz/shared'
import { RestFetch } from '@vunk/skzz/shared/utils-fetch'

export const restFetch  = new RestFetch({
  baseURL: '',
  DEV: true,
  customOk (res) {
    // 自定义后台成功的返回码
    return res.code === 0
  },
  onerror () {
    /**
     * 在 request 出现异常时调用 默认如下
     *   throttle((res) => {
     *       ElMessage({
     *         type: 'error',
     *         message: typeof res === 'string' ? res 
     *           : res?.msg,
     *       })
     *   }, 500, {
     *       trailing: false,
     *   })
     * */ 
  },
})

interface R<T> { // 一个自定义的泛型接口
  data: T
  code: number
  msg: string
}

export const request = <T>(...args: Parameters<RestFetchRequest>) => {
  const p = restFetch
    .request(...args) as unknown as Promise<R<T>>

  return p
}

