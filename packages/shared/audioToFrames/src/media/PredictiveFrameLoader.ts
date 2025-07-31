/**
 * @file 智能预测帧加载器
 *
 * 基于ping-pong动画的可预测性，提前加载后续帧以减少等待时间
 * 同时管理内存使用，避免过度缓存
 *
 * @author Zhonghan Li
 */

import type JSZip from 'jszip'
import type { ImageDataResponse } from './DataLoaderService'

export interface FrameLoadRequest {
  index: number
  priority: 'immediate' | 'prefetch' | 'background'
}

export class PredictiveFrameLoader {
  private frameCache = new Map<number, ImageBitmap>()
  private loadingPromises = new Map<number, Promise<ImageBitmap>>()
  private readonly MAX_CACHE_SIZE = 8 // 严格控制内存使用
  private readonly PREFETCH_COUNT = 3 // 预加载帧数
  private cacheAccessOrder: number[] = []

  private dataset: ImageDataResponse
  private zipInstance: JSZip

  constructor (
    dataset: ImageDataResponse,
    zipInstance: JSZip,
  ) {
    this.dataset = dataset
    this.zipInstance = zipInstance
  }

  /**
   * 获取指定帧，同时智能预测和加载后续帧
   */
  async getFrame (
    currentIndex: number,
    direction: number,
    totalFrames: number,
  ): Promise<ImageBitmap> {
    // 1. 立即开始预测加载
    this.predictAndPrefetch(currentIndex, direction, totalFrames)

    // 2. 获取当前帧
    return await this.loadFrame(currentIndex)
  }

  /**
   * 智能预测并预加载后续帧
   */
  private predictAndPrefetch (currentIndex: number, direction: number, totalFrames: number): void {
    const predictions = this.predictNextFrames(currentIndex, direction, totalFrames)

    // 按优先级预加载
    predictions.forEach((prediction, i) => {
      if (i < 2) {
        // 高优先级：立即加载
        this.loadFrame(prediction.index)
      }
      else {
        // 低优先级：后台加载
        this.scheduleIdleCallback(() => {
          this.loadFrame(prediction.index)
        })
      }
    })
  }

  /**
   * 兼容性的空闲回调调度器（Safari不支持requestIdleCallback）
   */
  private scheduleIdleCallback (callback: () => void): void {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(callback)
    }
    else {
      // Safari fallback: 使用setTimeout延迟执行
      setTimeout(callback, 16) // ~60fps
    }
  }

  /**
   * 预测ping-pong动画的后续帧序列
   */
  private predictNextFrames (
    currentIndex: number,
    direction: number,
    totalFrames: number,
  ): FrameLoadRequest[] {
    const predictions: FrameLoadRequest[] = []
    let index = currentIndex
    let currentDirection = direction

    for (let i = 0; i < this.PREFETCH_COUNT; i++) {
      // 计算下一帧索引和方向
      const { nextIndex, nextDirection } = this.calculateNextPingPongFrame(
        index,
        currentDirection,
        totalFrames,
      )

      predictions.push({
        index: nextIndex,
        priority: i < 2 ? 'prefetch' : 'background',
      })

      index = nextIndex
      currentDirection = nextDirection
    }

    return predictions
  }

  /**
   * 计算ping-pong动画的下一帧
   */
  private calculateNextPingPongFrame (
    currentIndex: number,
    direction: number,
    totalFrames: number,
  ): { nextIndex: number, nextDirection: number } {
    let nextIndex = currentIndex + direction
    let nextDirection = direction

    // 处理边界反弹
    if (nextIndex >= totalFrames) {
      nextIndex = totalFrames - 2
      nextDirection = -1
    }
    else if (nextIndex < 0) {
      nextIndex = 1
      nextDirection = 1
    }

    return { nextIndex, nextDirection }
  }

  /**
   * 加载单个帧（带缓存和内存管理）
   */
  private async loadFrame (index: number): Promise<ImageBitmap> {
    // 检查缓存
    if (this.frameCache.has(index)) {
      this.updateAccessOrder(index)
      return this.frameCache.get(index)!
    }

    // 检查是否正在加载
    if (this.loadingPromises.has(index)) {
      return await this.loadingPromises.get(index)!
    }

    // 开始加载
    const loadPromise = this.performFrameLoad(index)
    this.loadingPromises.set(index, loadPromise)

    try {
      const bitmap = await loadPromise

      // 添加到缓存
      this.addToCache(index, bitmap)

      return bitmap
    }
    finally {
      // 清理加载Promise
      this.loadingPromises.delete(index)
    }
  }

  /**
   * 实际执行帧加载
   */
  private async performFrameLoad (index: number): Promise<ImageBitmap> {
    const imageMeta = this.dataset.images[index]
    if (!imageMeta) {
      throw new Error(`帧索引 ${index} 超出范围`)
    }

    const file = this.zipInstance.file(imageMeta.full_image)
    if (!file) {
      throw new Error(`图像文件未找到: ${imageMeta.full_image}`)
    }

    const blob = await file.async('blob')
    return await createImageBitmap(blob)
  }

  /**
   * 添加到缓存并管理内存
   */
  private addToCache (index: number, bitmap: ImageBitmap): void {
    // 检查缓存大小限制
    if (this.frameCache.size >= this.MAX_CACHE_SIZE) {
      this.evictOldestFrame()
    }

    this.frameCache.set(index, bitmap)
    this.updateAccessOrder(index)
  }

  /**
   * 淘汰最久未使用的帧
   */
  private evictOldestFrame (): void {
    if (this.cacheAccessOrder.length === 0)
      return

    const oldestIndex = this.cacheAccessOrder.shift()!
    const oldBitmap = this.frameCache.get(oldestIndex)

    if (oldBitmap) {
      oldBitmap.close() // 释放GPU内存
      this.frameCache.delete(oldestIndex)
    }
  }

  /**
   * 更新访问顺序（LRU）
   */
  private updateAccessOrder (index: number): void {
    const existingIndex = this.cacheAccessOrder.indexOf(index)
    if (existingIndex > -1) {
      this.cacheAccessOrder.splice(existingIndex, 1)
    }
    this.cacheAccessOrder.push(index)
  }

  /**
   * 预热缓存：加载初始帧
   */
  async warmup (startIndex: number = 0): Promise<void> {
    const warmupIndices = [
      startIndex,
      Math.min(startIndex + 1, this.dataset.images.length - 1),
      Math.max(startIndex - 1, 0),
    ]

    await Promise.all(
      warmupIndices.map(index => this.loadFrame(index)),
    )
  }

  /**
   * 清理所有缓存
   */
  cleanup (): void {
    this.frameCache.forEach(bitmap => bitmap.close())
    this.frameCache.clear()
    this.loadingPromises.clear()
    this.cacheAccessOrder = []
  }

  /**
   * 获取缓存统计信息
   */
  getStats (): {
    cacheSize: number
    maxCacheSize: number
    cacheHitRatio: number
    memoryEstimate: string
  } {
    const estimatedMemory = this.frameCache.size * 1024 * 1024 // 假设每帧1MB

    return {
      cacheSize: this.frameCache.size,
      maxCacheSize: this.MAX_CACHE_SIZE,
      cacheHitRatio: 0, // TODO: 实现命中率统计
      memoryEstimate: `${(estimatedMemory / 1024 / 1024).toFixed(1)}MB`,
    }
  }
}
