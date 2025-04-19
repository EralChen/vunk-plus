import { request } from '@vunk/shared/fetch'

export async function speechToText (
  query: {
    application_id: string
    file: File
  },
) {
  return request<string>({
    method: 'POST',
    contentType: 'multipart/form-data',
    url: `/application/${query.application_id}/speech_to_text`,
    data: {
      file: query.file,
    },
  })
}

export async function textToSpeech (
  query: {
    application_id: string
    text: string
    type: 'ai-chat'
  },
) {
  return request<never, Blob>({
    method: 'POST',
    contentType: 'application/json',
    url: `/application/${query.application_id}/text_to_speech`,
    data: {
      text: query.text,
      type: query.type,
    },
    responseThen (res) {
      return res.blob()
    },
  })
}
