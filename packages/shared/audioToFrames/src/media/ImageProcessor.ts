/**
 * @file 图像张量与 Canvas 工具函数
 *
 * 本模块提供了与图像张量相关的常用工具函数，主要包括：
 * 1. 复用模块级 Canvas 以提升图像处理性能。
 * 2. 从 Blob 加载 ONNX 图像张量。
 * 3. 将张量高效转换为 ImageData 以便渲染。
 *
 * @author Zhonghan Li
 */

import type JSZip from 'jszip'
import { Tensor } from 'onnxruntime-web'

// =============================================================================
// --- 模块级 Canvas 复用以提升性能 ---
// =============================================================================

/** 复用的全局 Canvas 实例（支持主线程和 Worker）。 */
let canvas: HTMLCanvasElement | OffscreenCanvas | null = null
/** 复用的全局 2D 上下文。 */
let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null

/**
 * 获取一个共享的、模块级的 Canvas 2D 上下文。
 * 避免重复创建 Canvas 元素，提升性能。
 * @param width 画布期望宽度。
 * @param height 画布期望高度。
 * @returns 返回 2D 上下文。
 */
export function getSharedCanvasContext (
  width: number,
  height: number,
): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D {
  if (!canvas) {
    // 1. 检查是否在 Worker 环境中，优先使用 OffscreenCanvas
    if (typeof OffscreenCanvas !== 'undefined' && typeof document === 'undefined') {
      canvas = new OffscreenCanvas(width, height)
    }
    else {
      canvas = document.createElement('canvas')
    }
    ctx = canvas.getContext('2d', { willReadFrequently: true }) as
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D
    if (!ctx) {
      throw new Error('无法创建全局 canvas 上下文')
    }
  }
  // 2. 若尺寸变化则重置
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
  return ctx!
}

// =============================================================================
// --- 新增：Ping-Pong 动画状态计算 ---
// =============================================================================

/**
 * 计算 Ping-Pong 动画的下一帧状态（索引和方向）。
 *
 * @param currentIndex 当前帧索引。
 * @param numFrames 动画总帧数。
 * @param direction 当前播放方向 (1 为正向, -1 为反向)。
 * @returns 一个包含 { nextIndex, nextDirection } 的对象。
 */
export function calculatePingPongState (
  currentIndex: number,
  numFrames: number,
  direction: number,
): { nextIndex: number, nextDirection: number } {
  if (numFrames <= 1) {
    return { nextIndex: 0, nextDirection: 1 }
  }

  let nextIndex = currentIndex + direction
  let nextDirection = direction

  if (nextIndex >= numFrames) {
    nextIndex = numFrames - 2 // 到达终点后，从倒数第二帧开始返回
    nextDirection = -1
  }
  else if (nextIndex < 0) {
    nextIndex = 1 // 到达起点后，从第二帧开始前进
    nextDirection = 1
  }

  return { nextIndex, nextDirection }
}

// =============================================================================
// --- 图像张量加载与转换 ---
// =============================================================================

/**
 * 从 JSZip 实例中按需加载并解析图像张量。
 * @param tensorFileName 要加载的 .bin 文件的名称。
 * @param zip JSZip 实例。
 * @param cropSize 裁剪尺寸。
 * @param maskRegion 遮罩区域，格式为 [border, ...]。
 * @returns 一个 ONNX Tensor。
 */
export async function loadTensorFromZip (
  tensorFileName: string,
  zip: JSZip,
  cropSize: number,
  maskRegion: [number, number, number, number],
): Promise<Tensor> {
  const zipFile = zip.file(tensorFileName)
  if (!zipFile) {
    throw new Error(`无法在解压数据中找到张量文件: ${tensorFileName}`)
  }

  // 1. 计算有效区域尺寸
  const border = maskRegion[0]
  const innerSize = cropSize - 2 * border
  /** 张量形状 [N, C, H, W]，此处 N=1, C=6 */
  const tensorShape = [1, 6, innerSize, innerSize]

  // 2. 从zip中读取二进制数据并构造张量
  const buffer = await zipFile.async('arraybuffer')
  const tensorData = new Float32Array(buffer)

  return new Tensor('float32', tensorData, tensorShape)
}

/**
 * 将张量转换为 ImageData 对象，用于高性能渲染。
 * 此函数避免了昂贵的 toDataURL() 调用。
 * @param tensor 具有 [1, 3, H, W] 形状和 BGR 顺序的输入张量。
 * @returns 返回一个可以直接在 Canvas 上使用的 ImageData 对象，若格式不符则返回 null。
 */
export function convertTensorToImageData (tensor: Tensor): ImageData | null {
  const dims = tensor.dims
  const data = tensor.data as Float32Array

  // 1. 检查张量格式，仅支持 [1, 3, H, W] 或 [1, 1, H, W]
  if (dims.length !== 4 || (dims[1] !== 3 && dims[1] !== 1)) {
    console.error(
      '不支持的张量维度或通道数，仅支持NCHW [1, 3, H, W] 或 [1, 1, H, W]:',
      dims,
    )
    return null
  }

  const height = dims[2]
  const width = dims[3]

  // 2. 创建 ImageData 容器
  const localCtx = getSharedCanvasContext(width, height)
  const imageData = localCtx.createImageData(width, height)

  const pixels = imageData.data
  const clamp = (num: number) => Math.min(Math.max(num, 0), 1)
  const numPixels = height * width

  // 3. 只处理3通道彩色图像（BGR转RGB）
  const channelSize = height * width
  for (let i = 0; i < numPixels; i++) {
    const pixelIndex = i * 4
    const b_val = data[i]
    const g_val = data[i + channelSize]
    const r_val = data[i + 2 * channelSize]

    pixels[pixelIndex] = Math.round(clamp(r_val) * 255) // R
    pixels[pixelIndex + 1] = Math.round(clamp(g_val) * 255) // G
    pixels[pixelIndex + 2] = Math.round(clamp(b_val) * 255) // B
    pixels[pixelIndex + 3] = 255 // Alpha
  }

  // 4. 直接返回 ImageData，无需绘制到画布或转 DataURL
  return imageData
}
