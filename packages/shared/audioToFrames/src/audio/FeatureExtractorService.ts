/**
 * @file FeatureExtractorService.ts
 * 该服务封装了与特征提取 Web Worker 的交互，提供了一个简单的 Promise-based API。
 * @author Zhonghan Li
 */

import { createErrorHandler } from '../core/utils';

/**
 * 定义从 Worker 返回的成功消息的载荷结构。
 */
export interface FeatureExtractionResult {
  features: Float32Array;
  dimensions: number[];
}

export class FeatureExtractorService {
  private errorHandler = createErrorHandler('FeatureExtractorService');
  private worker: Worker;

  constructor() {
    // 直接创建Worker，与StreamingInferenceService保持一致
    this.worker = new Worker(
      new URL('../inference/workers/feature.worker.ts', import.meta.url),
      { type: 'module' }
    );
  }

  /**
   * 处理 AudioBuffer，在后台线程中提取特征。
   * @param audioBuffer Web Audio API 的 AudioBuffer 对象。
   * @returns 一个 Promise，成功时解析为特征结果，失败时拒绝并返回错误信息。
   */
  public async process(audioBuffer: AudioBuffer): Promise<FeatureExtractionResult> {
    try {
      // 准备要发送到 Worker 的数据
      const leftChannel = audioBuffer.getChannelData(0);
      const rightChannel = audioBuffer.numberOfChannels > 1 
        ? audioBuffer.getChannelData(1) 
        : undefined;

      const message = {
        leftChannel,
        rightChannel,
        sampleRate: audioBuffer.sampleRate,
      };

      // 发送消息，并将 Float32Array 的 buffer 作为 Transferable Objects 转移
      const transferList = [leftChannel.buffer, rightChannel?.buffer].filter(Boolean) as ArrayBuffer[];
      
      const result = await this.createWorkerPromise<FeatureExtractionResult>(
        message,
        transferList
      );
      
      return result;
    } catch (error) {
      throw this.errorHandler(error);
    }
  }

  /**
   * 创建Worker Promise，直接处理消息传递
   */
  private createWorkerPromise<T>(message: any, transferList: ArrayBuffer[]): Promise<T> {
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        this.worker.removeEventListener('message', handleMessage);
        this.worker.removeEventListener('error', handleError);
        
        if (event.data.status === 'success') {
          resolve(event.data.payload);
        } else {
          reject(new Error(event.data.error || 'Unknown worker error'));
        }
      };

      const handleError = (error: ErrorEvent) => {
        this.worker.removeEventListener('message', handleMessage);
        this.worker.removeEventListener('error', handleError);
        reject(error);
      };

      this.worker.addEventListener('message', handleMessage);
      this.worker.addEventListener('error', handleError);
      
      this.worker.postMessage(message, transferList);
    });
  }

  /**
   * 终止Worker
   */
  public terminate() {
    this.worker.terminate();
  }
} 