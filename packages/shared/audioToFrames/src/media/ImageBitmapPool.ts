/**
 * @file ImageBitmap对象池
 * 
 * 复用ImageBitmap对象以减少内存分配和垃圾回收压力
 * 特别适用于高频率的图像处理场景
 * 
 * @author Zhonghan Li
 */

export interface PooledBitmap {
    bitmap: ImageBitmap;
    width: number;
    height: number;
    inUse: boolean;
    lastUsed: number;
}

export class ImageBitmapPool {
    private pool: PooledBitmap[] = [];
    private readonly maxPoolSize: number;
    private readonly maxIdleTime: number; // 最大空闲时间（毫秒）
    
    constructor(maxPoolSize: number = 8, maxIdleTimeMs: number = 30000) {
        this.maxPoolSize = maxPoolSize;
        this.maxIdleTime = maxIdleTimeMs;
        
        // 定期清理空闲对象
        setInterval(() => this.cleanupIdleObjects(), 10000);
    }

    /**
     * 获取指定尺寸的ImageBitmap（优先从池中获取）
     */
    async acquire(width: number, height: number): Promise<ImageBitmap> {
        // 尝试从池中获取匹配的对象
        const pooled = this.findMatchingBitmap(width, height);
        
        if (pooled) {
            pooled.inUse = true;
            pooled.lastUsed = Date.now();
            return pooled.bitmap;
        }
        
        // 如果池中没有合适的对象，创建新的
        return this.createNewBitmap(width, height);
    }

    /**
     * 释放ImageBitmap回池中
     */
    release(bitmap: ImageBitmap): void {
        const pooled = this.pool.find(p => p.bitmap === bitmap);
        
        if (pooled) {
            pooled.inUse = false;
            pooled.lastUsed = Date.now();
            return;
        }
        
        // 如果池未满，添加到池中
        if (this.pool.length < this.maxPoolSize) {
            this.pool.push({
                bitmap,
                width: bitmap.width,
                height: bitmap.height,
                inUse: false,
                lastUsed: Date.now()
            });
        } else {
            // 池已满，直接关闭
            bitmap.close();
        }
    }

    /**
     * 从池中查找匹配尺寸的可用bitmap
     */
    private findMatchingBitmap(width: number, height: number): PooledBitmap | null {
        return this.pool.find(pooled => 
            !pooled.inUse && 
            pooled.width === width && 
            pooled.height === height
        ) || null;
    }

    /**
     * 创建新的ImageBitmap
     */
    private async createNewBitmap(width: number, height: number): Promise<ImageBitmap> {
        // 创建一个透明的ImageData
        const imageData = new ImageData(width, height);
        return await createImageBitmap(imageData);
    }

    /**
     * 清理空闲时间过长的对象
     */
    private cleanupIdleObjects(): void {
        const now = Date.now();
        const toRemove: number[] = [];
        
        this.pool.forEach((pooled, index) => {
            if (!pooled.inUse && (now - pooled.lastUsed) > this.maxIdleTime) {
                toRemove.push(index);
            }
        });
        
        // 从后往前删除，避免索引变化
        toRemove.reverse().forEach(index => {
            const pooled = this.pool[index];
            pooled.bitmap.close();
            this.pool.splice(index, 1);
        });
    }

    /**
     * 强制清理所有对象
     */
    cleanup(): void {
        this.pool.forEach(pooled => {
            if (!pooled.inUse) {
                pooled.bitmap.close();
            }
        });
        this.pool = [];
    }

    /**
     * 获取池统计信息
     */
    getStats(): {
        poolSize: number;
        maxPoolSize: number;
        inUseCount: number;
        availableCount: number;
        memoryEstimate: string;
    } {
        const inUseCount = this.pool.filter(p => p.inUse).length;
        const availableCount = this.pool.length - inUseCount;
        
        // 估算内存使用（假设每个像素4字节）
        const totalPixels = this.pool.reduce((sum, p) => sum + (p.width * p.height), 0);
        const memoryBytes = totalPixels * 4;
        
        return {
            poolSize: this.pool.length,
            maxPoolSize: this.maxPoolSize,
            inUseCount,
            availableCount,
            memoryEstimate: `${(memoryBytes / 1024 / 1024).toFixed(1)}MB`
        };
    }

    /**
     * 预热池：预先创建一些常用尺寸的bitmap
     */
    async warmup(commonSizes: Array<{ width: number; height: number }> = []): Promise<void> {
        const defaultSizes = [
            { width: 256, height: 256 },
            { width: 512, height: 512 },
            { width: 1024, height: 1024 }
        ];
        
        const sizes = commonSizes.length > 0 ? commonSizes : defaultSizes;
        
        for (const size of sizes) {
            if (this.pool.length < this.maxPoolSize) {
                try {
                    const bitmap = await this.createNewBitmap(size.width, size.height);
                    this.pool.push({
                        bitmap,
                        width: size.width,
                        height: size.height,
                        inUse: false,
                        lastUsed: Date.now()
                    });
                } catch (error) {
                    console.warn(`Failed to create bitmap for warmup: ${size.width}x${size.height}`, error);
                }
            }
        }
    }
}

// 全局单例实例
export const globalImageBitmapPool = new ImageBitmapPool();