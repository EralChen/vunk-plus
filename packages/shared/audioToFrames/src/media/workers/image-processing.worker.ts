/**
 * @file 图像处理Worker
 *
 * 在后台线程中处理图像批处理任务，避免阻塞主线程
 * 支持批量处理和各种图像变换操作
 *
 * @author Zhonghan Li
 */

export interface ImageProcessingTask {
  id: string;
  type: "batch_process" | "single_process" | "resize" | "blend";
  data: ArrayBuffer | ArrayBuffer[];
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "png" | "jpeg";
    blendMode?: "normal" | "multiply" | "overlay";
    opacity?: number;
  };
}

export interface ImageProcessingResult {
  id: string;
  success: boolean;
  data?: ImageBitmap | ImageBitmap[];
  error?: string;
  processingTime: number;
}

class ImageProcessingWorker {
  private canvas!: OffscreenCanvas;
  private ctx!: OffscreenCanvasRenderingContext2D;
  private isInitialized = false;

  constructor() {
    this.initializeCanvas();
  }

  private initializeCanvas(): void {
    try {
      this.canvas = new OffscreenCanvas(1024, 1024);
      const ctx = this.canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Failed to get 2D context");
      }

      this.ctx = ctx;
      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize OffscreenCanvas:", error);
      this.isInitialized = false;
    }
  }

  async processTask(task: ImageProcessingTask): Promise<ImageProcessingResult> {
    const startTime = performance.now();

    try {
      if (!this.isInitialized) {
        throw new Error("Worker not initialized");
      }

      let result: ImageBitmap | ImageBitmap[];

      switch (task.type) {
        case "batch_process":
          result = await this.processBatch(
            task.data as ArrayBuffer[],
            task.options
          );
          break;
        case "single_process":
          result = await this.processSingle(
            task.data as ArrayBuffer,
            task.options
          );
          break;
        case "resize":
          result = await this.resizeImage(
            task.data as ArrayBuffer,
            task.options
          );
          break;
        case "blend":
          result = await this.blendImages(
            task.data as ArrayBuffer[],
            task.options
          );
          break;
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }

      const processingTime = performance.now() - startTime;

      return {
        id: task.id,
        success: true,
        data: result,
        processingTime,
      };
    } catch (error) {
      const processingTime = performance.now() - startTime;

      return {
        id: task.id,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        processingTime,
      };
    }
  }

  private async processBatch(
    buffers: ArrayBuffer[],
    options?: ImageProcessingTask["options"]
  ): Promise<ImageBitmap[]> {
    const results: ImageBitmap[] = [];

    for (const buffer of buffers) {
      const bitmap = await this.processSingle(buffer, options);
      results.push(bitmap);
    }

    return results;
  }

  private async processSingle(
    buffer: ArrayBuffer,
    options?: ImageProcessingTask["options"]
  ): Promise<ImageBitmap> {
    // 从ArrayBuffer创建Blob
    const blob = new Blob([buffer]);

    // 创建ImageBitmap
    let bitmap = await createImageBitmap(blob);

    // 如果需要调整尺寸或进行其他处理
    if (options?.width || options?.height) {
      bitmap = await this.resizeImageBitmap(
        bitmap,
        options.width || bitmap.width,
        options.height || bitmap.height
      );
    }

    return bitmap;
  }

  private async resizeImage(
    buffer: ArrayBuffer,
    options?: ImageProcessingTask["options"]
  ): Promise<ImageBitmap> {
    const blob = new Blob([buffer]);
    const originalBitmap = await createImageBitmap(blob);

    const targetWidth = options?.width || originalBitmap.width;
    const targetHeight = options?.height || originalBitmap.height;

    const resizedBitmap = await this.resizeImageBitmap(
      originalBitmap,
      targetWidth,
      targetHeight
    );

    // 清理原始bitmap
    originalBitmap.close();

    return resizedBitmap;
  }

  private async resizeImageBitmap(
    bitmap: ImageBitmap,
    width: number,
    height: number
  ): Promise<ImageBitmap> {
    // 调整canvas尺寸
    this.canvas.width = width;
    this.canvas.height = height;

    // 清除画布
    this.ctx.clearRect(0, 0, width, height);

    // 绘制缩放后的图像
    this.ctx.drawImage(bitmap, 0, 0, width, height);

    // 从canvas创建新的ImageBitmap
    return await createImageBitmap(this.canvas);
  }

  private async blendImages(
    buffers: ArrayBuffer[],
    options?: ImageProcessingTask["options"]
  ): Promise<ImageBitmap> {
    if (buffers.length < 2) {
      throw new Error("Blend operation requires at least 2 images");
    }

    // 加载所有图像
    const bitmaps = await Promise.all(
      buffers.map((buffer) => createImageBitmap(new Blob([buffer])))
    );

    // 使用第一个图像的尺寸
    const firstBitmap = bitmaps[0];
    this.canvas.width = firstBitmap.width;
    this.canvas.height = firstBitmap.height;

    // 清除画布
    this.ctx.clearRect(0, 0, firstBitmap.width, firstBitmap.height);

    // 绘制第一个图像
    this.ctx.drawImage(firstBitmap, 0, 0);

    // 设置混合模式
    const blendMode = options?.blendMode || "source-over";
    this.ctx.globalCompositeOperation = blendMode as GlobalCompositeOperation;

    // 设置透明度
    if (options?.opacity !== undefined) {
      this.ctx.globalAlpha = options.opacity;
    }

    // 绘制其他图像
    for (let i = 1; i < bitmaps.length; i++) {
      this.ctx.drawImage(bitmaps[i], 0, 0);
    }

    // 重置混合模式
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.globalAlpha = 1.0;

    // 清理输入bitmap
    bitmaps.forEach((bitmap) => bitmap.close());

    // 返回混合结果
    return await createImageBitmap(this.canvas);
  }
}

// Worker实例
const worker = new ImageProcessingWorker();

// 处理消息
self.onmessage = async (event: MessageEvent<ImageProcessingTask>) => {
  const task = event.data;
  const result = await worker.processTask(task);

  // 发送结果回主线程
  self.postMessage(result, {
    transfer: result.data
      ? Array.isArray(result.data)
        ? result.data
        : [result.data]
      : [],
  });
};
