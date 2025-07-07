/**
 * @file 图像数据加载服务
 *
 * 本模块负责加载前端推理所需的图像元数据（JSON）及其对应的压缩图像文件（ZIP）。
 * 主要功能包括：
 * 1. 并行请求图像元数据和压缩包。
 * 2. 解压所有图像文件为 Blob，并以 Map 形式返回，便于后续按文件名索引。
 *
 * @author Zhonghan Li
 */

import JSZip from "jszip";

/**
 * 单帧图像的元数据信息。
 */
export interface ImageMetadata {
  frame_id: string;
  full_image: string;
  face_image: string;
  tensor_file: string;
  crop_info: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    width: number;
  };
}

/**
 * 数据集配置信息。
 */
export interface DatasetInfo {
  source_image_dimensions?: { width: number; height: number };
  config: {
    crop_size: number;
    mask_region: [number, number, number, number];
  };
}

/**
 * 图像数据响应结构。
 */
export interface ImageDataResponse {
  images: ImageMetadata[];
  dataset_info: DatasetInfo;
}

/**
 * 加载图像元数据和图像压缩包。
 * 此优化版本不再一次性解压所有文件，而是返回JSZip实例和zip Blob，
 * 以便在主线程和Worker中按需解压，显著降低初始内存占用。
 * @returns 包含图像元数据、JSZip实例和zip Blob的对象。
 * @throws 当任一资源加载失败时抛出异常。
 */
export async function loadImageData(): Promise<{
  imageData: ImageDataResponse;
  zip: JSZip;
  zipBlob: Blob;
}> {
  // 并行加载元数据和压缩包
  const [imageDataResponse, imageZipResponse] = await Promise.all([
    fetch("/complete_dataset.json"),
    fetch("/processed_images.zip"),
  ]);

  if (!imageDataResponse.ok) {
    throw new Error("无法加载图像元数据 `complete_dataset.json`。");
  }
  if (!imageZipResponse.ok) {
    throw new Error("无法加载图像压缩包 `processed_images.zip`。");
  }

  // 解析 JSON 元数据
  const imageData = (await imageDataResponse.json()) as ImageDataResponse;

  // 加载 ZIP 文件为一个 Blob，并创建一个 JSZip 实例用于按需读取
  const zipBlob = await imageZipResponse.blob();
  const zip = await JSZip.loadAsync(zipBlob);

  return { imageData, zip, zipBlob };
}
