async function createAudioContext (): Promise<AudioContext> {
  // 使用兼容的AudioContext构造函数
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext

  if (!AudioContextClass) {
    throw new Error('您的浏览器不支持Web Audio API')
  }

  const audioContext = new AudioContextClass()

  // 在Safari中，AudioContext可能处于suspended状态，需要用户交互后恢复
  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }

  return audioContext
}

export async function blobToAudioBuffer (blob: Blob): Promise<AudioBuffer> {
  const audioContext = await createAudioContext()
  const buffer = await blob.arrayBuffer()
  return audioContext.decodeAudioData(buffer)
}
