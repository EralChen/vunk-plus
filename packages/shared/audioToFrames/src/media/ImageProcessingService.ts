/**
 * @file 图像处理服务
 *
 * 管理图像处理Worker实例，提供简单的API接口
 * 处理任务队列和结果回调
 *
 * @author Zhonghan Li
 */

import type { ImageProcessingResult, ImageProcessingTask } from './workers/image-processing.worker'
import { workerConfig } from '../config'

export class ImageProcessingService {
  private worker: Worker | null = null
  private taskQueue = new Map<string, {
    resolve: (result: ImageProcessingResult) => void
    reject: (error: Error) => void
  }>()

  private isInitialized = false

  constructor () {
    this.initializeWorker()
  }

  private initializeWorker (): void {
    try {
      this.worker = workerConfig.path
        ? new Worker(
          /* @vite-ignore */
          `${workerConfig.path}/image-processing.worker.js`,
          { type: 'module' },
        )
        : new Worker(
          new URL('./workers/image-processing.worker.ts', import.meta.url),
          { type: 'module' },
        )

      this.worker.onmessage = (event: MessageEvent<ImageProcessingResult>) => {
        const result = event.data
        const task = this.taskQueue.get(result.id)

        if (task) {
          if (result.success) {
            task.resolve(result)
          }
          else {
            task.reject(new Error(result.error || 'Unknown error'))
          }
          this.taskQueue.delete(result.id)
        }
      }

      this.worker.onerror = (error) => {
        console.error('Image processing worker error:', error)
        this.rejectAllTasks(new Error('Worker error'))
      }

      this.isInitialized = true
    }
    catch (error) {
      console.error('Failed to initialize image processing worker:', error)
      this.isInitialized = false
    }
  }

  private rejectAllTasks (error: Error): void {
    this.taskQueue.forEach(task => task.reject(error))
    this.taskQueue.clear()
  }

  private generateTaskId (): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  async processImageBatch (buffers: ArrayBuffer[], options?: ImageProcessingTask['options']): Promise<ImageBitmap[]> {
    if (!this.isInitialized || !this.worker) {
      throw new Error('Image processing service not initialized')
    }

    const taskId = this.generateTaskId()
    const task: ImageProcessingTask = {
      id: taskId,
      type: 'batch_process',
      data: buffers,
      options,
    }

    return new Promise((resolve, reject) => {
      this.taskQueue.set(taskId, {
        resolve: (result) => {
          if (Array.isArray(result.data)) {
            resolve(result.data)
          }
          else {
            reject(new Error('Expected array result for batch processing'))
          }
        },
        reject,
      })

      this.worker!.postMessage(task, {
        transfer: buffers,
      })
    })
  }

  async processImage (buffer: ArrayBuffer, options?: ImageProcessingTask['options']): Promise<ImageBitmap> {
    if (!this.isInitialized || !this.worker) {
      throw new Error('Image processing service not initialized')
    }

    const taskId = this.generateTaskId()
    const task: ImageProcessingTask = {
      id: taskId,
      type: 'single_process',
      data: buffer,
      options,
    }

    return new Promise((resolve, reject) => {
      this.taskQueue.set(taskId, {
        resolve: (result) => {
          if (result.data && !Array.isArray(result.data)) {
            resolve(result.data)
          }
          else {
            reject(new Error('Expected single result for image processing'))
          }
        },
        reject,
      })

      this.worker!.postMessage(task, {
        transfer: [buffer],
      })
    })
  }

  async resizeImage (buffer: ArrayBuffer, width: number, height: number): Promise<ImageBitmap> {
    if (!this.isInitialized || !this.worker) {
      throw new Error('Image processing service not initialized')
    }

    const taskId = this.generateTaskId()
    const task: ImageProcessingTask = {
      id: taskId,
      type: 'resize',
      data: buffer,
      options: { width, height },
    }

    return new Promise((resolve, reject) => {
      this.taskQueue.set(taskId, {
        resolve: (result) => {
          if (result.data && !Array.isArray(result.data)) {
            resolve(result.data)
          }
          else {
            reject(new Error('Expected single result for image resizing'))
          }
        },
        reject,
      })

      this.worker!.postMessage(task, {
        transfer: [buffer],
      })
    })
  }

  async blendImages (buffers: ArrayBuffer[], options?: {
    blendMode?: 'normal' | 'multiply' | 'overlay'
    opacity?: number
  }): Promise<ImageBitmap> {
    if (!this.isInitialized || !this.worker) {
      throw new Error('Image processing service not initialized')
    }

    const taskId = this.generateTaskId()
    const task: ImageProcessingTask = {
      id: taskId,
      type: 'blend',
      data: buffers,
      options,
    }

    return new Promise((resolve, reject) => {
      this.taskQueue.set(taskId, {
        resolve: (result) => {
          if (result.data && !Array.isArray(result.data)) {
            resolve(result.data)
          }
          else {
            reject(new Error('Expected single result for image blending'))
          }
        },
        reject,
      })

      this.worker!.postMessage(task, {
        transfer: buffers,
      })
    })
  }

  cleanup (): void {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
    this.rejectAllTasks(new Error('Service cleanup'))
    this.isInitialized = false
  }

  getStats (): {
    queueSize: number
    isInitialized: boolean
  } {
    return {
      queueSize: this.taskQueue.size,
      isInitialized: this.isInitialized,
    }
  }
}
