import type {
  ImageDataResponse,
} from '../media/DataLoaderService'
import type { StreamingChunkData } from './StreamingInferenceService'

/**
 * 初始化Worker，加载ONNX模型
 */
export interface StreamingWorkerInitMessage {
  type: 'init'
  modelPath: string
}

/**
 * 初始化流式推理，加载数据集、图片Blob和混合掩码
 */
export interface StreamingWorkerInitStreamingMessage {
  type: 'init_streaming'
  dataset: ImageDataResponse
  zipBuffer: ArrayBuffer
  blendingMaskBitmap: ImageBitmap
  startImageIndex: number
}

/**
 * 运行单个chunk的推理
 */
export interface StreamingWorkerRunMessage {
  type: 'streaming_run'
  chunkData: StreamingChunkData
  dataset: ImageDataResponse
  imageBlobs: Map<string, Blob>
  blendingMaskBitmap: ImageBitmap
}

/**
 * 通知所有chunk已发送完毕，包含总帧数
 */
export interface StreamingWorkerFinishMessage {
  type: 'finish_chunks'
  totalFrames: number
}

/**
 * 停止推理，清理资源
 */
export interface StreamingWorkerStopMessage {
  type: 'stop'
}

/**
 * Worker可接收的所有消息类型
 */
export type StreamingWorkerMessage =
  | StreamingWorkerInitMessage
  | StreamingWorkerInitStreamingMessage
  | StreamingWorkerRunMessage
  | StreamingWorkerFinishMessage
  | StreamingWorkerStopMessage

/**
 * 主线程接收的单帧推理结果消息
 */
export interface MainThreadFrameMessage {
  type: 'frame'
  payload: {
    frame: ImageBitmap
    frameIndex: number
  }
}

/**
 * 主线程接收的chunk完成消息，包含耗时统计
 */
export interface MainThreadChunkCompleteMessage {
  type: 'chunk_complete'
  payload: {
    chunkIndex: number
    timings: Record<string, number>
  }
}

/**
 * 主线程接收的进度消息
 */
export interface MainThreadProgressMessage {
  type: 'progress'
  payload: {
    processed: number
    total: number
  }
}

/**
 * 主线程接收的全部完成消息，包含总耗时
 */
export interface MainThreadAllCompleteMessage {
  type: 'all_complete'
  payload: {
    totalTimings: Record<string, number>
  }
}

/**
 * 主线程接收的错误消息
 */
export interface MainThreadErrorMessage {
  type: 'error'
  payload: string
}

/**
 * 主线程接收的Worker就绪消息
 */
export interface MainThreadReadyMessage {
  type: 'ready'
}

/**
 * 主线程可接收的所有消息类型
 */
export type MainThreadMessage =
  | MainThreadFrameMessage
  | MainThreadChunkCompleteMessage
  | MainThreadProgressMessage
  | MainThreadAllCompleteMessage
  | MainThreadErrorMessage
  | MainThreadReadyMessage

// #endregion
