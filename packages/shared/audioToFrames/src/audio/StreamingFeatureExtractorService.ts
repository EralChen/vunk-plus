/**
 * @file StreamingFeatureExtractorService.ts
 *
 * 流式音频特征提取服务模块。
 * 1. 支持将长音频分割为5秒的chunk进行增量特征提取，显著降低首帧视频延迟。
 * 2. 每个chunk独立提取特征，处理完成后立即通过回调通知上层。
 * 3. 所有chunk处理完成后自动合并特征，输出完整特征序列。
 *
 * @author Zhonghan Li
 */

import { AsyncQueue } from '@sapphire/async-queue'
import { CHUNK_DURATION_SECONDS } from '../core/constants'
import { PerformanceTimer } from '../core/utils'
import { NUM_MEL_BINS, NUM_SEQUENCE_FRAMES } from './AudioProcessor'
import { FeatureExtractorService } from './FeatureExtractorService'

/**
 * 单个chunk的特征提取结果结构体。
 */
export interface ChunkFeatureResult {
  /** chunk索引（从0开始） */
  chunkIndex: number
  /** 特征数据（Float32Array） */
  features: Float32Array
  /** 特征维度信息 [帧数, 序列长度, mel频带数] */
  dimensions: number[]
  /** chunk起始时间（秒） */
  startTimeSeconds: number
  /** chunk结束时间（秒） */
  endTimeSeconds: number
}

/**
 * 流式特征提取回调接口定义。
 */
export interface StreamingCallbacks {
  /**
   * 单个chunk处理完成时回调。
   * @param result 当前chunk的特征结果。
   */
  onChunkComplete?: (result: ChunkFeatureResult) => void
  /**
   * 进度更新回调。
   * @param completed 已完成的chunk数。
   * @param total 总chunk数。
   */
  onProgress?: (completed: number, total: number) => void
  /**
   * 全部chunk处理完成时回调。
   * @param totalDimensions 合并后特征的维度信息。
   */
  onComplete?: (totalDimensions: number[]) => void
  /**
   * 处理出错时回调。
   * @param error 错误信息。
   */
  onError?: (error: string) => void
}

/**
 * 流式音频特征提取服务类。
 * 支持将长音频分块并行处理，实时回调chunk结果，最终合并输出全部特征。
 */
export class StreamingFeatureExtractorService {
  private queue = new AsyncQueue()

  /** 回调函数集合 */
  private callbacks: StreamingCallbacks = {}
  /** 性能计时器 */
  private timer = new PerformanceTimer()
  /** 存储每个chunk的处理结果，用于最终合并 */
  private chunkResults: (ChunkFeatureResult | null)[] = []
  /** 音频总chunk数 */
  private totalChunks = 0
  /** 已完成的chunk数 */
  private completedChunks = 0
  /** 已处理的总帧数累加器 */
  private totalFramesProcessed = 0
  /** 当前是否有任务在运行 */
  private isRunning = false
  /** 当前处理的音频缓冲区 */
  private audioBuffer: AudioBuffer | null = null
  /** 音频上下文实例，用于创建AudioBuffer */
  private audioContext: AudioContext | null = null
  /** 复用的特征提取器实例，以提高性能 */
  private featureExtractor: FeatureExtractorService | null = null

  /**
   * 创建AudioBuffer的兼容方法，处理Safari的限制。
   * @param numberOfChannels 声道数
   * @param length 缓冲区长度
   * @param sampleRate 采样率
   * @returns AudioBuffer实例
   */
  private async createAudioBuffer (
    numberOfChannels: number,
    length: number,
    sampleRate: number,
  ): Promise<AudioBuffer> {
    // 尝试使用AudioBuffer构造函数（现代浏览器）
    try {
      return new AudioBuffer({
        numberOfChannels,
        length,
        sampleRate,
      })
    }
    catch {
      // 如果失败，使用AudioContext.createBuffer（Safari兼容）
      if (!this.audioContext) {
        const AudioContextClass
          = window.AudioContext || (window as any).webkitAudioContext
        this.audioContext = new AudioContextClass()
      }

      return this.audioContext.createBuffer(
        numberOfChannels,
        length,
        sampleRate,
      )
    }
  }

  /**
   * 启动流式音频特征提取。
   * @param audioBuffer 输入的音频缓冲区。
   * @param callbacks 处理过程中的回调函数集合。
   */
  public async processStreaming (
    audioBuffer: AudioBuffer,
    callbacks: StreamingCallbacks,
  ): Promise<void> {
    await this.queue.wait()

    if (this.isRunning) {
      throw new Error('另一个音频正在处理中，请稍候。')
    }

    this.isRunning = true
    this.audioBuffer = audioBuffer
    this.callbacks = callbacks
    this.chunkResults = []
    this.completedChunks = 0
    this.totalFramesProcessed = 0
    this.featureExtractor = new FeatureExtractorService() // 复用实例

    const durationSeconds = audioBuffer.duration
    this.totalChunks = Math.ceil(durationSeconds / CHUNK_DURATION_SECONDS)

    try {
      this.timer.start('totalProcessing')

      // 优化：逐个处理chunk以减少内存叠加，并允许立即回调
      for (let chunkIndex = 0; chunkIndex < this.totalChunks; chunkIndex++) {
        if (!this.isRunning)
          break // 检查是否已停止
        this.timer.start(`chunk_${chunkIndex}`)
        await this.processChunk(chunkIndex)
        this.timer.end(`chunk_${chunkIndex}`)
      }

      // 优化：不再存储所有chunk，直接返回合并结果
      if (this.isRunning) {
        await this.finalize()
      }

      this.timer.end('totalProcessing')
    }
    catch (error) {
      // 处理异常，通知上层
      const errorMessage
        = error instanceof Error ? error.message : 'Unknown error'
      this.callbacks.onError?.(errorMessage)
    }
    finally {
      await this.queue.shift() // 确保总是释放队列
      // 清理资源
      this.cleanup()
    }
  }

  /**
   * 处理单个音频chunk，提取特征并回调。
   * @param chunkIndex chunk的索引（从0开始）。
   */
  private async processChunk (chunkIndex: number): Promise<void> {
    if (!this.audioBuffer || !this.featureExtractor)
      return

    // 1. 计算chunk的起止时间（秒）
    const startTimeSeconds = chunkIndex * CHUNK_DURATION_SECONDS
    const endTimeSeconds = Math.min(
      (chunkIndex + 1) * CHUNK_DURATION_SECONDS,
      this.audioBuffer.duration,
    )

    // 2. 计算采样点范围
    const startSample = Math.floor(
      startTimeSeconds * this.audioBuffer.sampleRate,
    )
    const endSample = Math.floor(endTimeSeconds * this.audioBuffer.sampleRate)
    const chunkLength = endSample - startSample

    console.log(
      `处理chunk ${chunkIndex}: ${startTimeSeconds.toFixed(
        2,
      )}s - ${endTimeSeconds.toFixed(2)}s`,
    )

    // 3. 创建该chunk的AudioBuffer (Safari兼容)
    const chunkBuffer = await this.createAudioBuffer(
      this.audioBuffer.numberOfChannels,
      chunkLength,
      this.audioBuffer.sampleRate,
    )

    // 4. 拷贝音频数据到chunk buffer
    for (
      let channel = 0;
      channel < this.audioBuffer.numberOfChannels;
      channel++
    ) {
      const sourceData = this.audioBuffer.getChannelData(channel)
      const chunkData = chunkBuffer.getChannelData(channel)
      chunkData.set(sourceData.subarray(startSample, endSample))
    }

    // 5. 使用复用的FeatureExtractorService实例处理该chunk
    try {
      this.timer.start(`extract_chunk_${chunkIndex}`)
      const result = await this.featureExtractor.process(chunkBuffer)
      this.timer.end(`extract_chunk_${chunkIndex}`)
      const chunkResult: ChunkFeatureResult = {
        chunkIndex,
        features: result.features,
        dimensions: result.dimensions,
        startTimeSeconds,
        endTimeSeconds,
      }

      // 累加已处理的总帧数
      this.totalFramesProcessed += chunkResult.dimensions[0]

      this.chunkResults[chunkIndex] = chunkResult
      this.completedChunks++

      console.log(
        `Chunk ${chunkIndex} 完成，特征维度: [${result.dimensions.join(', ')}]`,
      )

      // 7. 回调通知上层（立即传输数据）
      this.callbacks.onChunkComplete?.(chunkResult)
      this.callbacks.onProgress?.(this.completedChunks, this.totalChunks)

      // 优化：立即释放对该chunk结果的引用，因为它已被传递
      // 并且其ArrayBuffer很快会被转移，从而减少内存占用。
      this.chunkResults[chunkIndex] = null as any
    }
    catch (error) {
      // 捕获错误并向上抛出，由 processStreaming 统一处理
      console.error(`处理chunk ${chunkIndex} 时发生错误:`, error)
      throw error
    }
  }

  /**
   * 所有chunk处理完成后，合并特征并调用onComplete。
   */
  private async finalize (): Promise<void> {
    console.log('最终确定所有chunk的处理...')

    // 【修复】不再访问 chunkResults 数组，因为它已被清空以释放内存。
    // 我们现在使用在处理过程中累积的总帧数。
    if (this.completedChunks === 0) {
      this.callbacks.onError?.('No chunks were processed.')
      return
    }

    // 从常量构造维度信息。这些值在整个过程中是固定的。
    const totalDimensions = [
      this.totalFramesProcessed,
      NUM_SEQUENCE_FRAMES,
      NUM_MEL_BINS,
    ]

    console.log(`特征处理完成, 总维度: [${totalDimensions.join(', ')}]`)

    // 4. 回调通知全部完成
    this.callbacks.onComplete?.(totalDimensions)
  }

  /**
   * 清理内部状态和资源。
   */
  private cleanup (): void {
    this.isRunning = false
    this.audioBuffer = null

    // 终止复用的Worker
    if (this.featureExtractor) {
      this.featureExtractor.terminate()
      this.featureExtractor = null
    }

    // 清理chunk结果数组
    this.chunkResults.forEach((chunk) => {
      if (chunk && chunk.features) {
        // 释放Float32Array内存（如果可能）
        (chunk.features as any) = null
      }
    })
    this.chunkResults = []

    this.callbacks = {}
    this.completedChunks = 0
    this.totalChunks = 0
    this.totalFramesProcessed = 0

    // 重置性能计时器
    this.timer.reset()
  }

  /**
   * 停止当前的流式处理。
   */
  public stop (): void {
    if (this.isRunning) {
      console.log('停止流式音频处理')
      this.isRunning = false

      // 终止复用的Worker
      if (this.featureExtractor) {
        this.featureExtractor.terminate()
        this.featureExtractor = null
      }

      this.callbacks = {}
      this.chunkResults = []
      this.totalChunks = 0
      this.completedChunks = 0
      this.totalFramesProcessed = 0 // 重置累加器
    }
  }
}
