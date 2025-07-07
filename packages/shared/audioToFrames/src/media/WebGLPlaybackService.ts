/**
 * @file WebGLPlaybackService.ts
 * 基于WebGL的高性能视频播放服务，替代传统的Canvas 2D渲染。
 * 提供与PlaybackService相同的API，但使用WebGL进行渲染。
 * @author Zhonghan Li
 */

import { ref, shallowRef } from "vue";
import { FRAME_INTERVAL_MS } from "../core/constants";
import { WebGLRenderer } from "./WebGLRenderer";

export class WebGLPlaybackService {
  private webglRenderer: WebGLRenderer;
  private audioPlayer: HTMLAudioElement;
  private inferenceRunning = true;
  private animationFrameId: number | null = null;
  private lastFrameTimestamp = 0;
  private onPlaybackEndCallback: (() => void | Promise<void>) | null = null;
  private isWebGLSupported = false;

  /** 播放器是否正在播放。 */
  public readonly isPlaying = ref(false);
  /** 当前播放的帧索引。 */
  public readonly currentFrameIndex = ref(0);
  /** 已生成的视频帧 ImageBitmap 数组。 */
  public readonly generatedFrames = shallowRef<ImageBitmap[]>([]);

  /**
   * 创建一个新的 WebGLPlaybackService 实例。
   * @param canvas 用于渲染视频帧的 HTMLCanvasElement。
   * @param audioPlayer 用于同步播放的 HTMLAudioElement。
   * @param onPlaybackEndCallback 播放完成后的回调函数（支持异步）。
   */
  constructor(
    canvas: HTMLCanvasElement,
    audioPlayer: HTMLAudioElement,
    onPlaybackEndCallback: (() => void | Promise<void>) | null = null
  ) {
    this.audioPlayer = audioPlayer;
    this.onPlaybackEndCallback = onPlaybackEndCallback;

    // 检查WebGL支持
    this.isWebGLSupported = WebGLRenderer.isSupported();
    if (!this.isWebGLSupported) {
      console.warn("WebGL不受支持，将无法使用WebGL渲染");
      throw new Error("WebGL不受支持");
    }

    this.webglRenderer = new WebGLRenderer(canvas);
  }

  /**
   * 初始化WebGL渲染器
   */
  public async initialize(): Promise<void> {
    if (!this.isWebGLSupported) {
      throw new Error("WebGL不受支持");
    }

    try {
      await this.webglRenderer.initialize();

      // 输出WebGL信息
      const info = this.webglRenderer.getInfo();
      console.log("WebGL信息:", info);
    } catch (error) {
      console.error("WebGL渲染器初始化失败:", error);
      throw error;
    }
  }

  /**
   * 设置推理过程是否仍在运行。
   * 这用于确定当所有帧都播放完毕后是否停止播放循环。
   * @param status 推理是否正在运行。
   */
  public setInferenceRunning(status: boolean): void {
    this.inferenceRunning = status;
    // 如果推理已停止，且所有帧都已播放，则确保停止播放。
    if (
      !status &&
      this.isPlaying.value &&
      this.currentFrameIndex.value >= this.generatedFrames.value.length
    ) {
      this.stop();
    }
  }

  /**
   * 向播放列表添加一帧并触发播放（如果尚未开始）。
   * @param frameBitmap 要添加的视频帧。
   */
  public addFrame(frameBitmap: ImageBitmap): void {
    const frames = this.generatedFrames.value;
    frames.push(frameBitmap);

    // 当收到第一帧时，触发响应式更新以显示 Canvas，并开始播放。
    if (frames.length === 1) {
      this.generatedFrames.value = [...frames]; // 触发 v-if
      if (!this.isPlaying.value) {
        this.start();
      }
    }
  }

  /**
   * 开始实时播放。
   */
  public start(): void {
    if (this.isPlaying.value) return;

    this.isPlaying.value = true;
    this.lastFrameTimestamp = performance.now();

    // 从当前帧索引位置开始播放音频
    if (this.audioPlayer) {
      this.audioPlayer.currentTime =
        this.currentFrameIndex.value * (FRAME_INTERVAL_MS / 1000);
      this.audioPlayer.play().catch((e) => {
        console.warn("音频自动播放失败:", e);
      });
    }

    // 启动播放循环
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(
        this.playbackLoop.bind(this)
      );
    }
  }

  /**
   * 停止实时播放。
   */
  public stop(): void {
    this.isPlaying.value = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.audioPlayer) {
      this.audioPlayer.pause();
    }
  }

  /**
   * 清理所有播放资源，释放内存。
   * 包括停止播放、重置状态和释放 ImageBitmap 对象。
   */
  public cleanup(): void {
    this.stop();
    this.currentFrameIndex.value = 0;

    if (this.generatedFrames.value.length > 0) {
      const frameCount = this.generatedFrames.value.length;

      // 清理WebGL纹理缓存
      this.generatedFrames.value.forEach((frame) => {
        this.webglRenderer.clearTexture(frame);
        frame.close();
      });

      this.generatedFrames.value = [];
      console.log(`清理了 ${frameCount} 个缓存帧和WebGL纹理。`);
    }

    // 重新初始化WebGL渲染器而不是完全清理
    // this.webglRenderer.cleanup();
    // this.webglRenderer.initialize().catch((error) => {
    //   console.error("WebGL渲染器重新初始化失败:", error);
    // });

    this.inferenceRunning = true;
  }

  /**
   * 核心播放循环。
   * @param timestamp 当前时间戳。
   */
  private playbackLoop(timestamp: number): void {
    if (!this.isPlaying.value) {
      this.animationFrameId = null;
      return;
    }

    const elapsed = timestamp - this.lastFrameTimestamp;

    if (elapsed >= FRAME_INTERVAL_MS) {
      this.lastFrameTimestamp = timestamp - (elapsed % FRAME_INTERVAL_MS);

      const frameToDisplayIndex = this.currentFrameIndex.value;
      if (frameToDisplayIndex < this.generatedFrames.value.length) {
        const currentFrame = this.generatedFrames.value[frameToDisplayIndex];

        // 使用WebGL渲染帧
        this.webglRenderer.render(currentFrame);

        this.currentFrameIndex.value++;
      }

      // 检查是否所有帧都已播放完毕
      if (!this.inferenceRunning && this.generatedFrames.value.length === 0) {
        console.log("播放完成，所有帧已显示。");
        this.stop();
        this.cleanup(); // 确保资源被释放
        // 异步调用外部回调
        if (this.onPlaybackEndCallback) {
          Promise.resolve(this.onPlaybackEndCallback()).catch((error) => {
            console.error("播放结束回调执行出错:", error);
          });
        }
        return;
      }

      // 停止条件：推理已完成，且所有已生成的帧都已播放完毕。
      if (
        !this.inferenceRunning &&
        this.currentFrameIndex.value >= this.generatedFrames.value.length
      ) {
        console.log("播放完成，所有帧已显示。");
        this.stop();
        this.cleanup(); // 确保资源被释放
        // 异步调用外部回调
        if (this.onPlaybackEndCallback) {
          Promise.resolve(this.onPlaybackEndCallback()).catch((error) => {
            console.error("播放结束回调执行出错:", error);
          });
        }
        return;
      }
    }

    this.animationFrameId = requestAnimationFrame(this.playbackLoop.bind(this));
  }

  /**
   * 检查WebGL是否受支持
   */
  public static isWebGLSupported(): boolean {
    return WebGLRenderer.isSupported();
  }

  /**
   * 获取WebGL渲染器信息
   */
  public getWebGLInfo(): {
    renderer: string;
    vendor: string;
    version: string;
    maxTextureSize: number;
  } | null {
    if (!this.isWebGLSupported) {
      return null;
    }
    return this.webglRenderer.getInfo();
  }
}
