/**
 * @file 共享常量
 *
 * 存储在多个服务中使用的常量，避免重复定义
 *
 * @author Zhonghan Li
 */

/** Mel 滤波器组的数量 */
export const NUM_MEL_BINS = 80

/** 用于后续处理的序列帧数（每个块包含的帧数） */
export const NUM_SEQUENCE_FRAMES = 4

/** 每个chunk的时长（秒） */
export const CHUNK_DURATION_SECONDS = 5

/** 上下文窗口中的总块数 */
export const WINDOW_NUM_CHUNKS = 32

/** 上下文窗口的单边块数（半径） */
export const WINDOW_NUM_CHUNKS_HALF = WINDOW_NUM_CHUNKS / 2
