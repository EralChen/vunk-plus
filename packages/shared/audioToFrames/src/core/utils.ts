/**
 * @file 共享工具函数
 *
 * 提供基础错误处理工具函数
 *
 * @author Zhonghan Li
 */

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
 * 检查值是否为非空
 * @param value 要检查的值
 * @returns 类型守卫结果
 */
export function isNonNull<T> (value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
