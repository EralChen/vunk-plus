/**
 * @file 共享工具函数
 *
 * 提供性能测量、错误处理和其他通用工具函数
 *
 * @author Zhonghan Li
 */

// =============================================================================
// --- 性能测量工具 ---
// =============================================================================

/**
 * 性能计时器类
 * 用于测量代码段的执行时间
 */
export class PerformanceTimer {
  private timings: Record<string, number> = {}
  private startTimes: Record<string, number> = {}

  /**
   * 开始计时
   * @param name 计时器名称
   */
  start (name: string): void {
    this.startTimes[name] = performance.now()
  }

  /**
   * 结束计时并记录
   * @param name 计时器名称
   * @returns 耗时（毫秒）
   */
  end (name: string): number {
    const startTime = this.startTimes[name]
    if (startTime === undefined) {
      console.warn(`Timer "${name}" was not started`)
      return 0
    }

    const elapsed = performance.now() - startTime
    this.timings[name] = elapsed
    delete this.startTimes[name]

    return elapsed
  }

  /**
   * 获取所有计时结果
   * @returns 计时结果对象
   */
  getTimings (): Record<string, number> {
    return { ...this.timings }
  }

  /**
   * 重置所有计时器
   */
  reset (): void {
    this.timings = {}
    this.startTimes = {}
  }

  /**
   * 累加计时结果
   * @param name 计时器名称
   * @param value 要累加的值
   */
  accumulate (name: string, value: number): void {
    this.timings[name] = (this.timings[name] || 0) + value
  }

  /**
   * 合并其他计时器的结果
   * @param other 其他计时器实例
   */
  merge (other: PerformanceTimer): void {
    const otherTimings = other.getTimings()
    for (const [name, value] of Object.entries(otherTimings)) {
      this.accumulate(name, value)
    }
  }
}

/**
 * 创建性能测量装饰器
 * @param timerName 计时器名称
 * @param timer 计时器实例
 * @returns 装饰器函数
 */
export function measurePerformance (
  timerName: string,
  timer: PerformanceTimer,
) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      timer.start(timerName)
      const result = originalMethod.apply(this, args)

      if (result instanceof Promise) {
        return result.finally(() => {
          timer.end(timerName)
        })
      }
      else {
        timer.end(timerName)
        return result
      }
    }

    return descriptor
  }
}

// =============================================================================
// --- 错误处理工具 ---
// =============================================================================

/**
 * 标准化错误对象
 * @param error 原始错误
 * @returns 标准化的错误消息
 */
export function normalizeError (error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Unknown error occurred'
}

/**
 * 创建错误处理包装器
 * @param context 错误上下文
 * @param fallbackMessage 备用错误消息
 * @returns 错误处理函数
 */
export function createErrorHandler (
  context: string,
  _fallbackMessage: string = 'Operation failed',
) {
  return function (error: unknown): never {
    const errorMessage = normalizeError(error)
    const fullMessage = `${context}: ${errorMessage}`

    console.error(fullMessage)
    throw new Error(fullMessage)
  }
}

/**
 * 带重试的异步操作
 * @param operation 要执行的异步操作
 * @param maxRetries 最大重试次数
 * @param delay 重试间隔（毫秒）
 * @returns Promise结果
 */
export async function withRetry<T> (
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> {
  let lastError: unknown

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await operation()
    }
    catch (error) {
      lastError = error

      if (i === maxRetries) {
        break
      }

      console.warn(`Operation failed, retrying in ${delay}ms... (${i + 1}/${maxRetries})`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw new Error(`Operation failed after ${maxRetries} retries: ${normalizeError(lastError)}`)
}

// =============================================================================
// --- 数据处理工具 ---
// =============================================================================

export { debounce, cloneDeep as deepClone, throttle } from 'lodash-es'

// =============================================================================
// --- 类型守卫 ---
// =============================================================================

/**
 * 检查值是否为非空
 * @param value 要检查的值
 * @returns 类型守卫结果
 */
export function isNonNull<T> (value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * 检查值是否为有效数字
 * @param value 要检查的值
 * @returns 类型守卫结果
 */
export function isValidNumber (value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}

/**
 * 检查是否为有效的ArrayBuffer
 * @param value 要检查的值
 * @returns 类型守卫结果
 */
export function isValidArrayBuffer (value: unknown): value is ArrayBuffer {
  return value instanceof ArrayBuffer && value.byteLength > 0
}
