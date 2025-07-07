import type { ChunkFeatureResult } from './src/audio'
import { createAudioContext, StreamingFeatureExtractorService } from './src/audio'
import { StreamingInferenceService } from './src/inference'

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
