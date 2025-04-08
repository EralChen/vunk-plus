export async function speechToText (
  url: string,
  blob: Blob,
): Promise<string> {
  // 创建 FormData
  const formData = new FormData()
  formData.append('file', blob, 'audio.wav')

  // 调用本地语音识别 API
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Speech to text failed')
  }

  const result = await response.json()
  return result.text
}
