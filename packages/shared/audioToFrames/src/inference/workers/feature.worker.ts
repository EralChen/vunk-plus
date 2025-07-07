import { ConverterType, create } from '@alexanderolsen/libsamplerate-js'
/**
 * @file feature.worker.ts
 * Web Worker 脚本，用于在后台线程中执行密集的 Fbank 特征提取计算，
 * 以避免阻塞浏览器主线程。
 * @author Zhonghan Li
 */
import FFT from 'fft.js'
import {
  DEFAULT_LOW_FREQ,
  ENERGY_FLOOR,
  FRAME_LENGTH_MS,
  FRAME_SHIFT_MS,
  NUM_MEL_BINS,
  NUM_SEQUENCE_FRAMES,
  PREEMPH_COEFF,
  REMOVE_DC_OFFSET,
  ROUND_TO_POWER_OF_TWO,
  SAMPLE_RATE,
} from '../../core/constants'

// --- 计算得出的常量 ---

/** 每帧的采样点数。 */
const FRAME_LENGTH = Math.round((FRAME_LENGTH_MS * SAMPLE_RATE) / 1000)
/** 每帧的偏移采样点数。 */
const FRAME_SHIFT = Math.round((FRAME_SHIFT_MS * SAMPLE_RATE) / 1000)

// --- Kaldi 参数配置（从常量文件导入） ---

/**
 * 计算大于等于 n 的最小的2的幂。
 * @param n 输入数字。
 * @returns 返回大于等于 n 的最小的2的幂。
 */
function roundUpToNearestPowerOfTwo (n: number): number {
  if (n <= 0)
    return 1
  let power = 1
  while (power < n) {
    power *= 2
  }
  return power
}

/** FFT 计算点数。 */
const FFT_SIZE = ROUND_TO_POWER_OF_TWO
  ? roundUpToNearestPowerOfTwo(FRAME_LENGTH)
  : FRAME_LENGTH

// =============================================================================
// --- Mel 滤波器组创建 (预计算) ---
// =============================================================================

/**
 * 创建一个与 Kaldi 完全兼容的 Mel 滤波器组。
 *
 * @param numFilters Mel 滤波器的数量 (e.g., 80)。
 * @param fftSize FFT 的大小 (e.g., 512)。
 * @param sampleRate 音频采样率 (e.g., 16000)。
 * @param lowFreq 最低频率 (Hz)。Kaldi 默认为 20Hz。
 * @param highFreq 最高频率 (Hz)。默认为奈奎斯特频率 (sampleRate / 2)。
 * @returns 一个包含 `numFilters` 个 Float32Array 的数组，每个数组代表一个三角滤波器。
 */
export function createKaldiMelFilterBank (
  numFilters: number,
  fftSize: number,
  sampleRate: number,
  lowFreq: number = 20,
  highFreq?: number,
): Float32Array[] {
  highFreq = highFreq || sampleRate / 2

  const melToFreq = (mel: number) => 700.0 * (Math.exp(mel / 1127.0) - 1.0)
  const freqToMel = (freq: number) => 1127.0 * Math.log(1.0 + freq / 700.0)

  const lowMel = freqToMel(lowFreq)
  const highMel = freqToMel(highFreq)

  const melPoints = new Float32Array(numFilters + 2)
  for (let i = 0; i < numFilters + 2; i++) {
    melPoints[i] = lowMel + ((highMel - lowMel) * i) / (numFilters + 1)
  }

  const freqPoints = melPoints.map(melToFreq)
  const binPoints = freqPoints.map(freq => (freq * fftSize) / sampleRate)

  const filterBank: Float32Array[] = []
  const numFftBins = Math.floor(fftSize / 2) + 1

  for (let m = 1; m <= numFilters; m++) {
    const filter = new Float32Array(numFftBins)
    const leftBin = binPoints[m - 1]
    const centerBin = binPoints[m]
    const rightBin = binPoints[m + 1]

    for (let k = 0; k < numFftBins; k++) {
      if (k >= leftBin && k <= rightBin) {
        if (k <= centerBin) {
          filter[k]
            = centerBin > leftBin ? (k - leftBin) / (centerBin - leftBin) : 0.0
        }
        else {
          filter[k]
            = rightBin > centerBin
              ? (rightBin - k) / (rightBin - centerBin)
              : 0.0
        }
      }
      else {
        filter[k] = 0.0
      }
    }
    filterBank.push(filter)
  }

  return filterBank
}

/**
 * 预计算的 Kaldi 兼容 Mel 滤波器组，以提高运行时性能。
 */
const MEL_FILTER_BANK = createKaldiMelFilterBank(
  NUM_MEL_BINS,
  FFT_SIZE,
  SAMPLE_RATE,
  DEFAULT_LOW_FREQ,
)

// =============================================================================
// --- 音频处理工具函数 ---
// =============================================================================

/**
 * 对信号应用 Hanning 窗 (in-place)。
 */
function applyHanningWindowInPlace (signal: Float32Array): void {
  const N = signal.length
  if (N <= 1)
    return
  const factor = (2.0 * Math.PI) / (N - 1)
  for (let i = 0; i < N; i++) {
    const window = 0.5 - 0.5 * Math.cos(i * factor)
    signal[i] *= window
  }
}

/**
 * 对信号应用预加重滤波器 (in-place)。
 */
function applyPreemphasisInPlace (signal: Float32Array, coeff: number): void {
  if (coeff === 0.0)
    return
  for (let i = signal.length - 1; i > 0; i--) {
    signal[i] -= coeff * signal[i - 1]
  }
  if (signal.length > 0) {
    signal[0] -= coeff * signal[0]
  }
}

/**
 * 移除信号的直流分量 (in-place)。
 */
function removeDCOffsetInPlace (signal: Float32Array): void {
  if (signal.length === 0)
    return
  const mean = signal.reduce((sum, val) => sum + val, 0) / signal.length
  for (let i = 0; i < signal.length; i++) {
    signal[i] -= mean
  }
}

/**
 * 计算信号的功率谱。
 */
function computePowerSpectrum (
  outPowerSpectrum: Float32Array,
  fftResult: Float32Array | number[],
): void {
  const numBins = outPowerSpectrum.length
  for (let i = 0; i < numBins; i++) {
    const re = fftResult[i * 2]
    const im = fftResult[i * 2 + 1]
    outPowerSpectrum[i] = re * re + im * im
  }
}

/**
 * 对特征进行实例级标准化。
 */
function perInstanceNormalize (features: Float32Array): Float32Array {
  const len = features.length
  if (len < 2) {
    if (len === 1)
      return new Float32Array([0.0])
    return features
  }

  const mean = features.reduce((sum, val) => sum + val, 0) / len
  const variance
    = features.reduce((sum, val) => sum + (val - mean) ** 2, 0) / (len - 1)
  const std = Math.sqrt(variance)

  const normalized = new Float32Array(len)
  if (std > 1e-8) {
    for (let i = 0; i < len; i++) {
      normalized[i] = (features[i] - mean) / std
    }
  }
  else {
    for (let i = 0; i < len; i++) {
      normalized[i] = features[i] - mean
    }
  }
  return normalized
}

// =============================================================================
// --- Worker 核心逻辑 ---
// =============================================================================

/**
 * @interface WorkerInputData
 * 定义从主线程发送到 Worker 的数据结构。
 */
interface WorkerInputData {
  leftChannel: Float32Array
  rightChannel?: Float32Array // 立体声的右声道，单声道则无
  sampleRate: number
}

/**
 * 核心特征提取函数。
 * 接收原始音频数据，而不是完整的 AudioBuffer 对象。
 *
 * @param audioData 包含音频数据的对象
 * @returns 一个包含扁平化特征数组和其原始维度的对象。
 */
async function extractMelFeatures (
  audioData: WorkerInputData,
): Promise<{ features: Float32Array, dimensions: number[] }> {
  let pcmData = audioData.leftChannel
  const originalSampleRate = audioData.sampleRate

  // 1. 处理立体声音频
  if (audioData.rightChannel) {
    const mixedData = new Float32Array(pcmData.length)
    for (let i = 0; i < pcmData.length; i++) {
      mixedData[i] = (pcmData[i] + audioData.rightChannel[i]) / 2
    }
    pcmData = mixedData
  }

  // 2. 重采样
  if (originalSampleRate !== SAMPLE_RATE) {
    const resampler = await create(1, originalSampleRate, SAMPLE_RATE, {
      converterType: ConverterType.SRC_SINC_MEDIUM_QUALITY,
    })
    pcmData = resampler.simple(pcmData) as Float32Array
    resampler.destroy()
  }

  const numFrames
    = Math.floor((pcmData.length - FRAME_LENGTH) / FRAME_SHIFT) + 1
  if (numFrames <= 0) {
    throw new Error('特征提取失败：音频时长过短，无法生成至少一帧。')
  }

  // 3. 初始化 FFT
  const fft = new FFT(FFT_SIZE)
  const combinedFeatures = new Float32Array(numFrames * NUM_MEL_BINS)
  const frameData = new Float32Array(FRAME_LENGTH)
  const fftInput = fft.createComplexArray()
  const fftOutput = fft.createComplexArray()
  const powerSpectrum = new Float32Array(Math.floor(FFT_SIZE / 2) + 1)

  // 4. 逐帧处理
  for (let frameIdx = 0; frameIdx < numFrames; frameIdx++) {
    const startSample = frameIdx * FRAME_SHIFT
    const frameView = pcmData.subarray(startSample, startSample + FRAME_LENGTH)
    frameData.set(frameView)

    if (REMOVE_DC_OFFSET)
      removeDCOffsetInPlace(frameData)
    applyPreemphasisInPlace(frameData, PREEMPH_COEFF)
    applyHanningWindowInPlace(frameData)

    fftInput.fill(0)
    for (let i = 0; i < FRAME_LENGTH; i++) {
      fftInput[i * 2] = frameData[i]
    }

    fft.transform(fftOutput, fftInput)
    computePowerSpectrum(powerSpectrum, fftOutput)

    const melFeatureOffset = frameIdx * NUM_MEL_BINS
    for (let m = 0; m < NUM_MEL_BINS; m++) {
      let energy = 0.0
      const currentFilter = MEL_FILTER_BANK[m]
      for (let k = 0; k < powerSpectrum.length; k++) {
        energy += powerSpectrum[k] * currentFilter[k]
      }
      energy = Math.max(energy, ENERGY_FLOOR)
      combinedFeatures[melFeatureOffset + m] = Math.log(energy)
    }
  }

  // 5. 填充
  const numMelFrames = numFrames
  const paddedLength
    = Math.ceil(numMelFrames / NUM_SEQUENCE_FRAMES) * NUM_SEQUENCE_FRAMES
  const paddedFeatures = new Float32Array(paddedLength * NUM_MEL_BINS)
  paddedFeatures.set(combinedFeatures)

  if (paddedLength > numMelFrames) {
    const lastFrame = combinedFeatures.subarray(
      (numMelFrames - 1) * NUM_MEL_BINS,
    )
    for (let i = numMelFrames; i < paddedLength; i++) {
      paddedFeatures.set(lastFrame, i * NUM_MEL_BINS)
    }
  }

  // 6. 实例级标准化
  const normalizedFeatures = perInstanceNormalize(paddedFeatures)

  // 7. 准备返回结果
  const T = paddedLength
  const newT = T / NUM_SEQUENCE_FRAMES

  return {
    features: normalizedFeatures,
    dimensions: [newT, NUM_SEQUENCE_FRAMES, NUM_MEL_BINS],
  }
}

// --- Worker 入口 ---

globalThis.addEventListener(
  'message',
  async (event: MessageEvent<WorkerInputData>) => {
    try {
      const audioData = event.data
      const result = await extractMelFeatures(audioData)

      // 计算成功，将结果（包含可转移对象）发送回主线程
      globalThis.postMessage(
        {
          status: 'success',
          payload: result,
        },
        { transfer: [result.features.buffer] },
      )
    }
    catch (e) {
      // 计算失败，将错误信息发送回主线程
      globalThis.postMessage({
        status: 'error',
        error: (e as Error).message,
      })
    }
  },
)
