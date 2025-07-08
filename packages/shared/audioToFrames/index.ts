import type { ChunkFeatureResult } from './src/audio'
import maskUrl from './src/assets/mask'
import { createAudioContext, StreamingFeatureExtractorService } from './src/audio'
import { StreamingInferenceService } from './src/inference'
import { loadImageData } from './src/media'

export {
  StreamingInferenceService,
}

export async function blobToAudioWindow (blob: Blob, options?: {
  onChunkComplete?: (result: ChunkFeatureResult) => void
  onComplete?: (totalDimensions: number[]) => void
}) {
  const servie = new StreamingFeatureExtractorService()

  const audioContext = await createAudioContext()
  const buffer = await blob.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(buffer)

  servie.processStreaming(audioBuffer, {
    onChunkComplete: options?.onChunkComplete,
    onComplete: options?.onComplete,
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
