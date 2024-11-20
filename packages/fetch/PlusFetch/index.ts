import { RestFetch, RestFetchRequestOptions } from '@vunk/shared/fetch'
import { ElLoadingService, ElMessage, ElLoading } from 'element-plus'
import { sleep } from '@vunk/shared/promise'
import { throttle } from 'lodash-es'
import { isPlainObject } from '@vunk/shared/object'
import { AnyFunc, NormalObject } from '@vunk/shared'
import { Onerror, PlusFetchConstructorOptions, RequestInitOptions } from './types'



export const defaultOnerror = throttle((err) => {
  let message = '系统错误'
  if (err instanceof Error) {
    const local = {
      'Failed to fetch': '请求失败',
      'The user aborted a request.': '请求被终止',
    }
    message = local[err.message] || err.message
  
    if (err.name === 'AbortError'
      && err.message.includes('user')
    ) { 
      return
    }
  }
  if (typeof err  === 'string') {
    message = err
  }
  if (isPlainObject(err)) {
    const msg = (err as NormalObject)?.msg
    msg && (message = msg)
  }
  ElMessage({
    type: 'error',
    message,
  })
}, 500, { trailing: false })

/**
 * 基于 "@vunk/shared": RestFetch 
 * 扩展了 loading、error、message
 */
export class PlusFetch extends RestFetch {
  onerror: Onerror
  customOk: AnyFunc
  constructor (...args: [PlusFetchConstructorOptions]) {
    const opts = args[0]
    super(...args)
    this.onerror = opts.onerror ?? defaultOnerror
  }
  async request (
    options: RestFetchRequestOptions, 
    init?: RequestInitOptions,
    requestInit?: RequestInit,
  ): Promise<any> {
    const fetchPromise = super.request(options, requestInit)

    const initOptions = {
      loading: false,
      loadingDelay: 400,
      ...(init || {}),

      error: init?.error ?? true,
      onerror: init?.onerror ?? this.onerror,
      successMessage: init?.successMessage,


    } as Required<RequestInitOptions>

    const loading = initOptions.loading
    let loadingService: ReturnType<typeof ElLoadingService> | null = null

    if (loading) {
      const preRes = await Promise.race([
        sleep(initOptions.loadingDelay),
        fetchPromise,
      ])
      if (!preRes) { //sleep loadingDelay 通过,  超时开启loading
        if (ElLoading.service) {
          loadingService =  ElLoading.service(
            typeof initOptions.loading === 'boolean' 
              ? {} 
              : initOptions.loading,
          )
        } else {
          loadingService =  ElLoadingService(
            typeof initOptions.loading === 'boolean' ? {} : initOptions.loading,
          )
        }
      }
    }
    
    let res 
    try {
      res = await fetchPromise
    } catch (err) {
      loadingService?.close()
      if (initOptions.error) {
        initOptions.onerror(err)
      }
      throw err
    }
    loadingService?.close()

    if (!this.customOk(res)) {
      initOptions.error && this.onerror(res)
      if (initOptions.throwResErr) {
        return Promise.reject(res)
      } 
    }

    if (initOptions.successMessage) {
      ElMessage({
        type: 'success',
        message: typeof initOptions.successMessage === 'string'
          ? initOptions.successMessage
          : '操作成功',
      })
    }

    return res
  }
}

