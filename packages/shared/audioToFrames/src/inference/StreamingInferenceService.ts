/**
 * @file StreamingInferenceService.ts
 *
 * 流式推理服务模块，支持增量推理模式。
 * 1. 每收到一个chunk的音频特征后，立即开始推理该部分的视频帧，显著降低首帧延迟。
 * 2. 支持推理进度、帧级回调、chunk完成回调、全部完成回调及错误处理。
 *
 * @author Zhonghan Li
 */

import type { ChunkFeatureResult } from '../audio/StreamingFeatureExtractorService'
import type { ImageDataResponse } from '../media/DataLoaderService'
import type {
  MainThreadMessage,
  StreamingWorkerInitMessage as WorkerInitMessage,
} from './types'
import { Deferred } from '@vunk/shared/promise'
import { workerConfig } from '../config'

/**
 * 单个流式推理chunk的数据结构。
 */
export interface StreamingChunkData {
  /** chunk索引（从0开始） */
  chunkIndex: number
  /** 音频特征（Float32Array） */
  audioFeatures: Float32Array
  /** 特征维度信息 [帧数, 序列长度, mel频带数] */
  audioDimensions: number[]
  /** 该chunk对应的起始帧索引 */
  startFrame: number
  /** 该chunk对应的结束帧索引 */
  endFrame: number
}

/**
 * 发送给worker的流式推理消息类型。
 */
export interface StreamingWorkerRunMessage {
  /** 消息类型，固定为 "streaming_run" */
  type: 'streaming_run'
  /** 当前chunk的数据 */
  chunkData: StreamingChunkData
  /** 图像数据集（已在init_streaming中发送，此处占位） */
  dataset: ImageDataResponse
  /** 图像Blob映射（已在init_streaming中发送，此处占位） */
  zipBlob: Blob
  /** 融合掩码（已在init_streaming中发送，此处占位） */
  blendingMaskBitmap: ImageBitmap
  /** 起始图像帧索引 */
  startImageIndex: number
}

/**
 * 流式推理回调接口定义。
 */
export interface StreamingInferenceCallbacks {
  /**
   * 推理进度回调。
   * @param processed 已处理帧数
   * @param total 总帧数
   */
  onProgress?: (processed: number, total: number) => void
  /**
   * 单帧推理完成回调。
   * @param frame 生成的视频帧
   * @param frameIndex 帧索引
   */
  onFrame?: (frame: ImageBitmap, frameIndex: number) => void
  /**
   * 单个chunk推理完成回调。
   * @param chunkIndex chunk索引
   * @param timings 该chunk的耗时统计
   */
  onChunkComplete?: (
    chunkIndex: number,
    timings: Record<string, number>
  ) => void
  /**
   * 所有chunk推理完成回调。
   * @param totalTimings 总耗时统计
   */
  onAllComplete?: (totalTimings: Record<string, number>) => void
  /**
   * 推理错误回调。
   * @param message 错误信息
   */
  onError?: (message: string) => void
}

/**
 * 流式推理服务主类。
 */
export class StreamingInferenceService {
  /** 后台推理Worker实例 */
  private worker: Worker | null = null
  /** 推理回调函数集合 */
  private callbacks: StreamingInferenceCallbacks = {}
  /** Worker是否已初始化 */
  private isInitialized = false
  /** 待推理的chunk数据映射 */
  private pendingChunks = new Map<number, StreamingChunkData>()
  /** 已完成推理的chunk索引集合 */
  private completedChunks = new Set<number>()
  /** 当前累计的总帧数 */
  private totalFrames = 0
  /** 是否处于推理处理中 */
  private isProcessing = false
  /** 全局chunk索引计数器，确保每个chunk有唯一索引 */
  private globalChunkIndex = 0

  private _def = new Deferred<void>()

  /**
   * 构造函数，初始化Worker并注册消息回调。
   * @param modelPath 模型路径
   * @param onReady Worker初始化完成回调
   */
  constructor (modelPath: string, onReady?: () => void) {
    this.worker = new Worker(
      /* @vite-ignore */
      `${workerConfig.path}/streaming.inference.worker.js`,
      { type: 'module' },
    )

    this.worker.onmessage = (event: MessageEvent<MainThreadMessage>) => {
      const { type } = event.data
      switch (type) {
        case 'ready':
          this.isInitialized = true
          onReady?.()
          this._def.resolve()
          break
        case 'progress':
          this.callbacks.onProgress?.(
            event.data.payload.processed,
            event.data.payload.total,
          )
          break
        case 'frame': {
          // 解析帧数据并回调
          const frameData = event.data.payload as {
            frame: ImageBitmap
            frameIndex: number
          }
          this.callbacks.onFrame?.(frameData.frame, frameData.frameIndex)
          break
        }
        case 'chunk_complete': {
          // 记录已完成的chunk并回调
          const chunkData = event.data.payload as {
            chunkIndex: number
            timings: Record<string, number>
          }
          this.completedChunks.add(chunkData.chunkIndex)
          this.callbacks.onChunkComplete?.(
            chunkData.chunkIndex,
            chunkData.timings,
          )
          // 检查是否所有chunk都已完成
          // 对于连续的音频流处理，不要在每个音频文件完成后清理
          if (this.completedChunks.size === this.pendingChunks.size && this.pendingChunks.size > 0) {
            this.callbacks.onAllComplete?.({})
            // 使用轻度清理，保持帧计数和chunk索引的连续性
            this.lightCleanup()
          }
          break
        }
        case 'error':
          // 推理错误回调
          this.callbacks.onError?.(event.data.payload)
          this.cleanup()
          break
      }
    }

    this.worker.onerror = (error) => {
      this.callbacks.onError?.(`Worker error: ${error.message}`)
      this.cleanup()
    }

    // 初始化worker
    this.worker.postMessage({ type: 'init', modelPath } as WorkerInitMessage)
  }

  /**
   * 判断推理服务是否已准备就绪。
   * @returns 是否已初始化
   */
  public isReady (): boolean {
    return this.isInitialized
  }

  public when () {
    return this._def.promise
  }

  /**
   * 启动流式推理流程，发送共享数据到worker。
   * @param sharedData 所有chunk共享的数据（图像、配置等）
   * @param callbacks 推理过程中的回调函数
   * @param startImageIndex 起始图像帧索引，默认为0
   */
  public async startStreaming (
    sharedData: {
      dataset: ImageDataResponse
      zipBlob: Blob
      blendingMaskBitmap: ImageBitmap
    },
    callbacks: StreamingInferenceCallbacks,
    startImageIndex = 0,
  ): Promise<void> {
    if (!this.worker || !this.isInitialized) {
      throw new Error('推理服务尚未初始化完成。')
    }

    this.callbacks = callbacks
    this.pendingChunks.clear()
    this.completedChunks.clear()
    this.totalFrames = 0
    this.isProcessing = true

    // 发送共享数据到worker
    const zipBuffer = await sharedData.zipBlob.arrayBuffer()
    const message = {
      type: 'init_streaming',
      dataset: sharedData.dataset,
      zipBuffer,
      blendingMaskBitmap: sharedData.blendingMaskBitmap,
      startImageIndex,
    }

    this.worker.postMessage(message, [sharedData.blendingMaskBitmap, zipBuffer])
  }

  /**
   * 添加一个chunk进行推理。
   * @param chunkResult 特征提取完成的chunk
   */
  public addChunk (chunkResult: ChunkFeatureResult): void {
    if (!this.worker || !this.isProcessing) {
      console.warn('无法添加chunk：推理服务未准备就绪或未在处理中')
      return
    }

    // 计算该chunk在整体序列中的帧范围
    const chunkFrames = chunkResult.dimensions[0]
    const startFrame = this.totalFrames
    const endFrame = startFrame + chunkFrames
    this.totalFrames = endFrame

    // 使用全局唯一的chunk索引，而不是原始的从0开始的索引
    const uniqueChunkIndex = this.globalChunkIndex++

    // 注意：不再复制特征数组。其所有权将直接转移到Worker，
    // 这可以减少内存分配和复制开销。
    // 上游服务 (StreamingFeatureExtractorService) 在回调后不会再使用此数据。
    const chunkData: StreamingChunkData = {
      chunkIndex: uniqueChunkIndex, // 使用全局唯一索引
      audioFeatures: chunkResult.features, // 直接使用，不复制
      audioDimensions: chunkResult.dimensions,
      startFrame,
      endFrame,
    }

    this.pendingChunks.set(uniqueChunkIndex, chunkData)

    // 立即发送该chunk进行推理
    const message: StreamingWorkerRunMessage = {
      type: 'streaming_run',
      chunkData,
      dataset: {} as ImageDataResponse, // 已在init_streaming中发送
      zipBlob: new Blob(), // 已在init_streaming中发送
      blendingMaskBitmap: {} as ImageBitmap, // 已在init_streaming中发送
      startImageIndex: 0, // 已在init_streaming中发送
    }

    // 直接转移 chunkResult.features 的 buffer
    this.worker.postMessage(message, [chunkData.audioFeatures.buffer])
  }

  /**
   * 通知所有chunk都已添加完成，发送总帧数到worker。
   */
  public finishAddingChunks (): void {
    if (!this.worker)
      return

    this.worker.postMessage({
      type: 'finish_chunks',
      totalFrames: this.totalFrames,
    })
  }

  /**
   * 清理内部状态和资源。
   */
  private cleanup (): void {
    this.isProcessing = false
    this.callbacks = {}
    this.pendingChunks.clear()
    this.completedChunks.clear()
    this.totalFrames = 0
    this.globalChunkIndex = 0
  }

  /**
   * 轻度清理，保持连续性，用于音频文件间的清理。
   */
  private lightCleanup (): void {
    this.completedChunks.clear()
    this.pendingChunks.clear()
    // 保持 totalFrames 和 globalChunkIndex 的连续性
  }

  /**
   * 停止推理并清理资源，通知worker停止。
   */
  public stop (): void {
    this.cleanup()
    if (this.worker) {
      this.worker.postMessage({ type: 'stop' })
    }
  }

  /**
   * 彻底终止worker并清理所有资源。
   */
  public terminate (): void {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
      this.isInitialized = false
    }
    this.cleanup()
  }
}
