

import { ReturnVoid } from '@vunk/core'
import { RestFetchConstructorOptions } from '@vunk/shared/fetch'
import { LoadingOptions } from 'element-plus'

/**
 *  Response: !response.ok 
 *  Error:  request error, abort error
 */
export type BaseErrorEvent = Response | Error

/**
 *  Response: !response.ok 
 *  Error:  request error, abort error
 *  { msg: string }: 业务错误
 *  string: 业务错误
 */
export type ErrorEvent = BaseErrorEvent | { msg?: string } | string 


/**
  * 错误回调
  */
export type Onerror<E = ErrorEvent> =  (e: E) => ReturnVoid



export interface PlusFetchConstructorOptions 
extends RestFetchConstructorOptions {
  onerror?: Onerror
}



export interface RequestInitOptions {
  /**
   * 是否显示 loading
   */
  loading?: boolean | LoadingOptions;


  /**
   * loading 延时出现
   */
  loadingDelay?: number;



  /**
   * 若为true 则在请求失败时，触发回调 onerror
   * @default true
   */
  error?: boolean 

  /**
   * fetch 请求错误时回调
   */
  onerror?: Onerror


  /**
   * 请求成功 将提示 msg
   */
  successMessage?: boolean | string

  /**
   * 后端有响应
   * 但是 code 不成功
   * 是否需要抛出异常
   * @default false
   */
  throwResErr?: boolean 
}


