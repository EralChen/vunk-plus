import type { ChunkFeatureResult } from './src/audio'
import maskUrl from './src/assets/mask'
import { createAudioContext, StreamingFeatureExtractorService } from './src/audio'
import { StreamingInferenceService } from './src/inference'
import { loadImageData } from './src/media'

export {
  StreamingInferenceService,
}

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
  return new Promise<number[]>((resolve) => {
    const service = new StreamingFeatureExtractorService()

    service.processStreaming(buffer, {
      onChunkComplete: callbacks?.onChunkComplete,
      onComplete: resolve,
    })
  })
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
