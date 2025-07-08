/**
 * @file streaming.inference.worker.ts
 * 流式推理Web Worker，支持分块增量推理以降低首帧延迟。
 * 该Worker用于在Web端进行ONNX模型的流式推理，主要用于音频驱动的人脸合成等场景。
 * 支持分块(chunk)处理，降低首帧延迟，并通过消息机制与主线程通信。
 * @author Zhonghan Li
 */

import type {
  DatasetInfo,
  ImageDataResponse,
  ImageMetadata,
} from '../../media/DataLoaderService'
import type { StreamingChunkData } from '../StreamingInferenceService'
import JSZip from 'jszip'
import { env, InferenceSession, Tensor } from 'onnxruntime-web'
import { getAudioWindow } from '../../audio/AudioProcessor'
import {
  calculatePingPongState,
  convertTensorToImageData,
  loadTensorFromZip,
} from '../../media/ImageProcessor'

// [TODO] 配置wasm路径（相对于public目录）
env.wasm.wasmPaths = '/vunk-plus/'

// WebGPU 类型声明（用于类型推断，实际未用到WebGPU推理）
declare interface GPUAdapter {}

// #region --- Message Types ---

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

// #region --- ONNX Utilities (复用现有逻辑) ---

/**
 * 扩展Navigator接口以支持WebGPU检测
 */
interface NavigatorWithGPU extends Navigator {
  gpu?: {
    requestAdapter: () => Promise<GPUAdapter | null>
  }
}

/**
 * ONNX wasm session选项类型
 */
interface WasmSessionOptions {
  wasm?: {
    numThreads?: number
  }
}

/**
 * 检测最佳推理后端（WebGPU优先，实际目前强制使用wasm以保证稳定性）
 * @returns 推理后端及session选项
 */
async function detectBestExecutionProvider (): Promise<{
  providers: string[]
  sessionOptions: WasmSessionOptions
}> {
  if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
    try {
      const adapter = await (
        navigator as NavigatorWithGPU
      ).gpu?.requestAdapter()
      if (adapter) {
        console.log('WebGPU is available, using \'webgpu\' execution provider.')
        return {
          providers: ['webgpu'],
          sessionOptions: {
            wasm: {
              numThreads: navigator.hardwareConcurrency || 4,
            },
          },
        }
      }
    }
    catch (e) {
      console.log('WebGPU detection failed, falling back to WASM.', e)
    }
  }

  console.log('Using \'wasm\' execution provider.')
  return {
    providers: ['wasm'],
    sessionOptions: {
      wasm: {
        numThreads: navigator.hardwareConcurrency || 4,
      },
    },
  }
}

// #endregion

// #region --- ONNX Runner ---

/**
 * ONNX模型推理封装类
 * 支持模型加载与单步推理
 */
class StreamingONNXRunner {
  private session: InferenceSession | null = null

  /**
   * 加载ONNX模型
   * @param modelPath 模型文件路径
   */
  async initialize (modelPath: string): Promise<void> {
    const response = await fetch(modelPath)
    const modelBuffer = await response.arrayBuffer()

    const { providers, sessionOptions } = await detectBestExecutionProvider()
    console.log(
      `Initializing streaming ONNX session with providers: ${providers.join(
        ', ',
      )}`,
    )

    this.session = await InferenceSession.create(new Uint8Array(modelBuffer), {
      executionProviders: providers,
      graphOptimizationLevel: 'all',
      ...sessionOptions,
    } as InferenceSession.SessionOptions)

    console.log('Streaming ONNX session created successfully')
  }

  /**
   * 执行一次推理
   * @param imageTensor 输入图像张量
   * @param audioTensor 输入音频张量
   * @returns 推理输出张量
   */
  async runInference (
    imageTensor: Tensor,
    audioTensor: Tensor,
  ): Promise<Tensor> {
    if (!this.session) {
      throw new Error('ONNX session not initialized.')
    }
    const feeds = {
      [this.session.inputNames[0]]: imageTensor,
      [this.session.inputNames[1]]: audioTensor,
    }
    const results = await this.session.run(feeds)
    return results[this.session.outputNames[0]]
  }
}

// #endregion

// #region --- Frame Compositing (复用现有逻辑) ---

/**
 * 合成最终帧图像
 * @param predTensor 推理输出张量
 * @param frameMeta 当前帧元数据
 * @param datasetInfo 数据集配置信息
 * @param bitmaps 当前帧所需的ImageBitmap集合
 * @param maskImage 融合掩码ImageBitmap
 * @returns [最终帧ImageBitmap, 各阶段耗时统计]
 */
async function compositeFrame (
  predTensor: Tensor,
  frameMeta: ImageMetadata,
  datasetInfo: DatasetInfo,
  bitmaps: Map<string, ImageBitmap>,
  maskImage: ImageBitmap,
): Promise<[ImageBitmap, Record<string, number>]> {
  const t: Record<string, number> = {
    convertTensor: 0,
    createPredCanvas: 0,
    createPastedCanvas: 0,
    blendOps: 0,
    compositeFinal: 0,
    createImageBitmap: 0,
  }
  let t0 = performance.now()

  // 获取全图与人脸图像
  const fullImage = bitmaps.get(frameMeta.full_image)
  const faceImage = bitmaps.get(frameMeta.face_image)

  if (!fullImage || !faceImage) {
    throw new Error(`Missing image data for frame ${frameMeta.frame_id}`)
  }

  // 检查可复用Canvas实例是否已初始化
  if (
    !predCanvas
    || !predCtx
    || !pastedPredCanvas
    || !pastedPredCtx
    || !blendedFaceCanvas
    || !blendedFaceCtx
    || !finalCanvas
    || !finalCtx
  ) {
    throw new Error('可复用Canvas实例未初始化')
  }

  // 1. 推理张量转ImageData
  t0 = performance.now()
  const predImageData = convertTensorToImageData(predTensor)
  t.convertTensor = performance.now() - t0
  if (!predImageData) {
    throw new Error(
      `Failed to convert tensor to image for frame ${frameMeta.frame_id}`,
    )
  }

  const border = datasetInfo.config.mask_region[0]
  const cropSize = datasetInfo.config.crop_size

  // 2. 生成推理结果画布（使用可复用实例）
  t0 = performance.now()
  predCtx.clearRect(0, 0, predCanvas.width, predCanvas.height)
  predCtx.putImageData(predImageData, 0, 0)
  t.createPredCanvas = performance.now() - t0

  // 3. 将推理结果粘贴到人脸区域（使用可复用实例）
  t0 = performance.now()
  pastedPredCtx.clearRect(
    0,
    0,
    pastedPredCanvas.width,
    pastedPredCanvas.height,
  )
  pastedPredCtx.drawImage(faceImage, 0, 0)
  pastedPredCtx.drawImage(predCanvas, border, border)
  t.createPastedCanvas = performance.now() - t0

  // 4. 融合掩码与人脸（使用可复用实例）
  t0 = performance.now()
  blendedFaceCtx.clearRect(
    0,
    0,
    blendedFaceCanvas.width,
    blendedFaceCanvas.height,
  )
  blendedFaceCtx.drawImage(pastedPredCanvas, 0, 0)
  blendedFaceCtx.globalCompositeOperation = 'destination-in'
  blendedFaceCtx.drawImage(maskImage, 0, 0, cropSize, cropSize)
  blendedFaceCtx.globalCompositeOperation = 'destination-over'
  blendedFaceCtx.drawImage(faceImage, 0, 0)
  // 重置合成操作模式
  blendedFaceCtx.globalCompositeOperation = 'source-over'
  t.blendOps = performance.now() - t0

  // 5. 合成到全图（使用可复用实例）
  t0 = performance.now()
  finalCtx.clearRect(0, 0, finalCanvas.width, finalCanvas.height)
  finalCtx.drawImage(fullImage, 0, 0)
  const { xmin, ymin, width } = frameMeta.crop_info
  const cropHeight = frameMeta.crop_info.ymax - ymin
  finalCtx.drawImage(blendedFaceCanvas, xmin, ymin, width, cropHeight)
  t.compositeFinal = performance.now() - t0

  // 6. 转为ImageBitmap
  t0 = performance.now()
  const finalBitmap = await createImageBitmap(finalCanvas)
  t.createImageBitmap = performance.now() - t0

  return [finalBitmap, t]
}

// #endregion

// #region --- Worker State ---

/**
 * Worker全局状态
 */
const onnxRunner = new StreamingONNXRunner() // ONNX推理器
let sharedDataset: ImageDataResponse | null = null // 当前数据集
let sharedZip: JSZip | null = null // 图片Zip实例
let sharedBlendingMask: ImageBitmap | null = null // 融合掩码
let totalExpectedFrames = 0 // 期望总帧数
let processedFrames = 0 // 已处理帧数
let imageIndex = 0 // 当前图片帧索引
let imageStep = 1 // 图片帧步进方向

// --- 新增：可复用的 OffscreenCanvas 实例 ---
let predCanvas: OffscreenCanvas | null = null
let predCtx: OffscreenCanvasRenderingContext2D | null = null
let pastedPredCanvas: OffscreenCanvas | null = null
let pastedPredCtx: OffscreenCanvasRenderingContext2D | null = null
let blendedFaceCanvas: OffscreenCanvas | null = null
let blendedFaceCtx: OffscreenCanvasRenderingContext2D | null = null
let finalCanvas: OffscreenCanvas | null = null
let finalCtx: OffscreenCanvasRenderingContext2D | null = null

// --- 流水线控制状态 ---
const chunkQueue = new Map<number, StreamingChunkData>() // chunk队列，按chunkIndex索引
let isProcessingQueue = false // 是否正在处理队列
let nextChunkToProcess = 0 // 下一个待处理chunk的索引

// #endregion

// #region --- Canvas and Cache Management ---

/**
 * 初始化可复用的OffscreenCanvas实例
 * @param cropSize 裁剪尺寸
 * @param border 边框大小
 * @param fullImageWidth 完整图像宽度
 * @param fullImageHeight 完整图像高度
 */
function initializeReusableCanvases (
  cropSize: number,
  border: number,
  fullImageWidth: number,
  fullImageHeight: number,
): void {
  // 推理结果画布
  const predSize = cropSize - 2 * border
  predCanvas = new OffscreenCanvas(predSize, predSize)
  predCtx = predCanvas.getContext('2d')!

  // 粘贴画布
  pastedPredCanvas = new OffscreenCanvas(cropSize, cropSize)
  pastedPredCtx = pastedPredCanvas.getContext('2d')!

  // 融合画布
  blendedFaceCanvas = new OffscreenCanvas(cropSize, cropSize)
  blendedFaceCtx = blendedFaceCanvas.getContext('2d')!

  // 最终画布
  finalCanvas = new OffscreenCanvas(fullImageWidth, fullImageHeight)
  finalCtx = finalCanvas.getContext('2d')!

  console.log(
    `初始化可复用Canvas实例，裁剪尺寸: ${cropSize}, 推理尺寸: ${predSize}, 全图尺寸: ${fullImageWidth}x${fullImageHeight}`,
  )
}

/**
 * 清理可复用的Canvas实例
 */
function cleanupReusableCanvases (): void {
  predCanvas = null
  predCtx = null
  pastedPredCanvas = null
  pastedPredCtx = null
  blendedFaceCanvas = null
  blendedFaceCtx = null
  finalCanvas = null
  finalCtx = null
}

/**
 * 从ZIP中直接加载ImageBitmap（无缓存）
 * @param imagePath 图像路径
 * @param zip ZIP实例
 * @returns ImageBitmap实例
 */
async function loadImageBitmapFromZip (
  imagePath: string,
  zip: JSZip,
): Promise<ImageBitmap> {
  const file = zip.file(imagePath)
  if (!file) {
    throw new Error(`Image file not found in ZIP: ${imagePath}`)
  }

  const blob = await file.async('blob')
  return await createImageBitmap(blob)
}

// #endregion

// #region --- Chunk Processing ---

/**
 * 处理单个chunk，逐帧推理并合成
 * @param chunkData chunk数据
 */
async function processChunk (chunkData: StreamingChunkData): Promise<void> {
  if (!sharedDataset || !sharedZip || !sharedBlendingMask) {
    throw new Error('共享数据尚未初始化，无法处理chunk')
  }

  const { chunkIndex, audioFeatures, audioDimensions, startFrame, endFrame }
    = chunkData

  console.log(`开始处理chunk ${chunkIndex}，帧范围: ${startFrame}-${endFrame}`)

  // 记录各阶段耗时
  const timings = {
    loadTensor: 0,
    getAudio: 0,
    onnxRun: 0,
    composite: 0,
    totalFrames: 0,
    t_convertTensor: 0,
    t_createPredCanvas: 0,
    t_createPastedCanvas: 0,
    t_blendOps: 0,
    t_compositeFinal: 0,
    t_createImageBitmap: 0,
  }

  const imageFrames = sharedDataset.images
  const numImageFrames = imageFrames.length
  if (numImageFrames === 0) {
    throw new Error('Image data is empty.')
  }

  // audioDimensions: [帧数, chunk_size, mel_bins]
  const [, chunk_size, mel_bins] = audioDimensions
  const audioWindowSize = 32 // 固定音频窗口长度
  const numFramesToProcess = audioDimensions[0]

  for (let i = 0; i < numFramesToProcess; i++) {
    const globalFrameIndex = startFrame + i
    const imageFrameMeta = imageFrames[imageIndex]

    // 1. 加载图片张量
    let t0 = performance.now()
    const imageTensor = await loadTensorFromZip(
      imageFrameMeta.tensor_file,
      sharedZip,
      sharedDataset.dataset_info.config.crop_size,
      sharedDataset.dataset_info.config.mask_region,
    )
    timings.loadTensor += performance.now() - t0

    // 2. 获取音频窗口并构造音频张量
    t0 = performance.now()
    const audioWindowData = getAudioWindow(audioFeatures, audioDimensions, i)
    const audioTensor = new Tensor('float32', audioWindowData, [
      1,
      audioWindowSize,
      chunk_size,
      mel_bins,
    ])
    timings.getAudio += performance.now() - t0

    // 3. ONNX推理
    t0 = performance.now()
    const outputTensor = await onnxRunner.runInference(
      imageTensor,
      audioTensor,
    )
    timings.onnxRun += performance.now() - t0

    try {
      // 4. 从ZIP加载全图与人脸ImageBitmap
      const fullImageBitmap = await loadImageBitmapFromZip(
        imageFrameMeta.full_image,
        sharedZip,
      )
      const faceImageBitmap = await loadImageBitmapFromZip(
        imageFrameMeta.face_image,
        sharedZip,
      )

      // 临时bitmaps集合，供合成函数使用
      const tempBitmaps = new Map<string, ImageBitmap>()
      tempBitmaps.set(imageFrameMeta.full_image, fullImageBitmap)
      tempBitmaps.set(imageFrameMeta.face_image, faceImageBitmap)

      // 5. 合成最终帧
      t0 = performance.now()
      const [finalFrameBitmap, frameTimings] = await compositeFrame(
        outputTensor,
        imageFrameMeta,
        sharedDataset.dataset_info,
        tempBitmaps,
        sharedBlendingMask,
      )
      timings.composite += performance.now() - t0

      // 6. 发送帧数据，包含全局帧索引，并显式转移ImageBitmap
      self.postMessage(
        {
          type: 'frame',
          payload: {
            frame: finalFrameBitmap,
            frameIndex: globalFrameIndex,
          },
        } as MainThreadFrameMessage,
        {
          transfer: [finalFrameBitmap],
        },
      )

      // 7. 发送进度
      processedFrames++
      self.postMessage({
        type: 'progress',
        payload: { processed: processedFrames, total: totalExpectedFrames },
      } as MainThreadProgressMessage)

      // 8. 累加合成阶段详细耗时
      timings.t_convertTensor += frameTimings.convertTensor
      timings.t_createPredCanvas += frameTimings.createPredCanvas
      timings.t_createPastedCanvas += frameTimings.createPastedCanvas
      timings.t_blendOps += frameTimings.blendOps
      timings.t_compositeFinal += frameTimings.compositeFinal
      timings.t_createImageBitmap += frameTimings.createImageBitmap
    }
    catch (error) {
      console.error(`处理帧 ${globalFrameIndex} 时发生错误:`, error)
      throw error
    }

    // 9. 使用共享的辅助函数更新图片帧索引
    const { nextIndex, nextDirection } = calculatePingPongState(
      imageIndex,
      numImageFrames,
      imageStep,
    )
    imageIndex = nextIndex
    imageStep = nextDirection
    timings.totalFrames++

    // 10. 释放张量资源
    imageTensor.dispose()
    audioTensor.dispose()
    outputTensor.dispose()
  }

  console.log(`Chunk ${chunkIndex} 处理完成`)

  // 通知chunk完成
  self.postMessage({
    type: 'chunk_complete',
    payload: {
      chunkIndex,
      timings,
    },
  } as MainThreadChunkCompleteMessage)
}

/**
 * 处理chunk队列，确保按顺序处理
 */
async function processQueue () {
  if (isProcessingQueue)
    return // 防止并发执行
  if (chunkQueue.has(nextChunkToProcess)) {
    isProcessingQueue = true

    const chunkToProcess = chunkQueue.get(nextChunkToProcess)!
    chunkQueue.delete(nextChunkToProcess)

    console.log(`从队列取出并处理 chunk ${chunkToProcess.chunkIndex}`)

    try {
      await processChunk(chunkToProcess)
    }
    catch (e: unknown) {
      // 捕获并向主线程报告处理单个chunk时发生的错误
      self.postMessage({
        type: 'error',
        payload: (e as Error).message || '处理chunk时发生未知错误',
      } as MainThreadErrorMessage)
    }
    finally {
      nextChunkToProcess++
      isProcessingQueue = false
      // 立即尝试处理下一个chunk，实现连续处理
      queueMicrotask(processQueue)
    }
  }
}

// #endregion

// #region --- Worker Main Logic ---

/**
 * Worker主消息处理入口
 * 根据消息类型执行不同操作
 */
self.onmessage = async (event: MessageEvent<StreamingWorkerMessage>) => {
  try {
    const { type } = event.data

    if (type === 'init') {
      // 初始化ONNX模型
      await onnxRunner.initialize(event.data.modelPath)
      self.postMessage({ type: 'ready' } as MainThreadReadyMessage)
    }
    else if (type === 'init_streaming') {
      // 初始化流式推理所需数据
      sharedDataset = event.data.dataset
      sharedZip = await JSZip.loadAsync(event.data.zipBuffer)
      sharedBlendingMask = event.data.blendingMaskBitmap

      // 清理之前的Canvas实例
      cleanupReusableCanvases()

      // 初始化可复用的Canvas实例
      const datasetInfo = sharedDataset.dataset_info
      const cropSize = datasetInfo.config.crop_size
      const border = datasetInfo.config.mask_region[0]
      const sourceDims = datasetInfo.source_image_dimensions

      if (!sourceDims) {
        throw new Error('数据集中缺少源图像尺寸信息')
      }

      initializeReusableCanvases(
        cropSize,
        border,
        sourceDims.width,
        sourceDims.height,
      )

      // 重置所有状态
      processedFrames = 0
      totalExpectedFrames = 0

      // 【修复】正确初始化ping-pong状态
      const numImages = sharedDataset.images.length
      if (numImages > 0) {
        const resumeFromIndex = event.data.startImageIndex || 0
        if (numImages > 1) {
          const cycleLen = (numImages - 1) * 2
          const effectiveIndex = cycleLen > 0 ? resumeFromIndex % cycleLen : 0

          if (effectiveIndex < numImages) {
            imageIndex = effectiveIndex
            imageStep = 1
          }
          else {
            imageIndex = cycleLen - effectiveIndex
            imageStep = -1
          }
        }
        else {
          imageIndex = 0
          imageStep = 1
        }
      }
      else {
        imageIndex = 0
        imageStep = 1
      }

      // 重置队列状态
      chunkQueue.clear()
      isProcessingQueue = false
      nextChunkToProcess = 0
      console.log('流式推理初始化完成，队列已重置，Canvas实例已初始化')
    }
    else if (type === 'streaming_run') {
      // 收到新chunk，加入队列并尝试处理
      const chunkData = event.data.chunkData
      console.log(`收到并排队 chunk ${chunkData.chunkIndex}`)
      chunkQueue.set(chunkData.chunkIndex, chunkData)
      processQueue() // 尝试处理队列
    }
    else if (type === 'finish_chunks') {
      // 所有chunk已发送完毕，记录总帧数
      totalExpectedFrames = event.data.totalFrames
      console.log(`所有chunks添加完成，总计 ${totalExpectedFrames} 帧`)
    }
    else if (type === 'stop') {
      // 停止推理，清理所有资源和状态
      console.log('停止流式推理')
      sharedDataset = null
      sharedZip = null
      if (sharedBlendingMask) {
        sharedBlendingMask.close()
        sharedBlendingMask = null
      }

      // 清理Canvas实例
      cleanupReusableCanvases()

      processedFrames = 0
      totalExpectedFrames = 0
      imageIndex = 0
      imageStep = 1
      // 清理队列
      chunkQueue.clear()
      isProcessingQueue = false
      nextChunkToProcess = 0
    }
  }
  catch (e: unknown) {
    // 捕获并上报Worker内部错误
    const error = e as Error
    console.error('Streaming inference worker error:', error)
    self.postMessage({
      type: 'error',
      payload:
        error.message
        || 'An unknown error occurred in the streaming inference worker.',
    } as MainThreadErrorMessage)
  }
}

// #endregion
