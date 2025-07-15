import type { ChunkFeatureResult } from './src/audio'
import { AsyncQueue } from '@sapphire/async-queue'
import maskUrl from './src/assets/mask'
import { createAudioContext, StreamingFeatureExtractorService } from './src/audio'
import { workerConfig } from './src/config'
import { StreamingInferenceService } from './src/inference'
import { loadImageData } from './src/media'

export {
  StreamingInferenceService,
  workerConfig,
}

// Create a singleton queue instance for audio processing
const audioProcessingQueue = new AsyncQueue()

export async function blobToAudioBuffer (blob: Blob): Promise<AudioBuffer> {
  const audioContext = await createAudioContext()
  const buffer = await blob.arrayBuffer()
  return audioContext.decodeAudioData(buffer)
}

export async function processStreaming (
  buffer: AudioBuffer,
  callbacks?: {
    onChunkComplete?: (result: ChunkFeatureResult) => void
  },
) {
  // Wait for the queue to ensure serialized processing
  await audioProcessingQueue.wait()

  try {
    return await new Promise<number[]>((resolve, reject) => {
      const service = new StreamingFeatureExtractorService()

      service.processStreaming(buffer, {
        onChunkComplete: callbacks?.onChunkComplete,
        onComplete: (dimensions) => {
          resolve(dimensions)
        },
        onError: (error) => {
          reject(new Error(error))
        },
      })
    })
  }
  finally {
    // Always shift the queue, whether success or error
    audioProcessingQueue.shift()
  }
}

export async function getStremingStartData (options: {
  sourceUrl: string
  datasetUrl: string
}) {
  const { imageData, zip, zipBlob } = await loadImageData(options.datasetUrl, options.sourceUrl)

  const img = new Image()
  img.src = maskUrl
  await img.decode()
  const blendingMaskBitmap = await createImageBitmap(img)

  return {
    dataset: imageData,
    zip,
    zipBlob,
    blendingMaskBitmap,
  }
}
