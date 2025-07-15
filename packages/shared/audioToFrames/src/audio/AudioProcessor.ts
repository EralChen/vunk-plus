/**
 * @file 音频特征处理工具
 *
 * 本模块提供了对 `FeatureExtractorService` 提取出的 Fbank 特征进行后续处理的工具函数。
 * 主要功能包括：
 * 1. 提供一个窗口函数 `getAudioWindow` 用于从完整的特征序列中提取上下文窗口。
 *
 * @author Zhonghan Li
 */

import {
  NUM_MEL_BINS,
  NUM_SEQUENCE_FRAMES,
  WINDOW_NUM_CHUNKS,
  WINDOW_NUM_CHUNKS_HALF,
} from '../core/constants'

// 重新导出常量以保持向后兼容性
export { NUM_MEL_BINS, NUM_SEQUENCE_FRAMES }

/**
 * 从完整的音频特征中提取一个固定大小的上下文窗口。
 *
 * @param allAudioFeatures `FeatureExtractorService` 返回的扁平化特征数组。
 * @param allAudioDims `FeatureExtractorService` 返回的维度数组，形如 `[T_chunks, 4, 80]`。
 * @param centerChunkIndex 窗口中心的块（chunk）索引。
 * @returns 一个新的扁平化 Float32Array，代表 (32, 4, 80) 的窗口数据。
 */
export function getAudioWindow (allAudioFeatures: Float32Array, allAudioDims: number[], centerChunkIndex: number): Float32Array {
  if (allAudioDims.length !== 3) {
    throw new Error(
      'Invalid dimensions array provided to getAudioWindow. Expected length 3.',
    )
  }
  const [numChunks, chunkSize, melBins] = allAudioDims

  // 创建一个用于存放窗口数据的最终数组，形状为 (32, 4, 80)
  const finalWindowData = new Float32Array(
    WINDOW_NUM_CHUNKS * chunkSize * melBins,
  )

  const chunkTotalSize = chunkSize * melBins

  for (let j = 0; j < WINDOW_NUM_CHUNKS; j++) {
    // 计算源数据块的索引
    const sourceChunkIndex = centerChunkIndex - WINDOW_NUM_CHUNKS_HALF + j

    // 通过“钳位”来处理边界情况，镜像 Python/NumPy 的 'edge' 填充模式
    const clampedSourceIndex = Math.max(
      0,
      Math.min(sourceChunkIndex, numChunks - 1),
    )

    // 计算源数据块在扁平数组中的起始和结束位置
    const sourceChunkStart = clampedSourceIndex * chunkTotalSize
    const sourceChunkEnd = sourceChunkStart + chunkTotalSize

    // 使用 subarray 创建源数据块的视图，避免复制
    const chunkData = allAudioFeatures.subarray(
      sourceChunkStart,
      sourceChunkEnd,
    )

    // 将数据块复制到目标窗口数组的正确位置
    const destChunkStart = j * chunkTotalSize
    finalWindowData.set(chunkData, destChunkStart)
  }

  return finalWindowData
}

/**
 * 创建AudioContext的兼容函数，处理Safari的限制。
 * 在Safari中，AudioContext需要在用户交互后才能创建。
 */
export async function createAudioContext (): Promise<AudioContext> {
  // 使用兼容的AudioContext构造函数
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext

  if (!AudioContextClass) {
    throw new Error('您的浏览器不支持Web Audio API')
  }

  const audioContext = new AudioContextClass()

  // 在Safari中，AudioContext可能处于suspended状态，需要用户交互后恢复
  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }

  return audioContext
}
