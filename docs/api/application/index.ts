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
  },
) {
  return request<never, Blob>({
    method: 'POST',
    contentType: 'application/json',
    url: `/application/${query.application_id}/text_to_speech`,
    data: {
      text: query.text,
      type: 'metahuman-chat',
    },
    responseThen (res) {
      return res.blob()
    },
  })
}

/**
 * @description: 新建聊天
 */
export async function cChatId (
  query: {
    application_id: string
  },
) {
  return request<string>({
    method: 'GET',
    url: `/application/${query.application_id}/chat/open`,
  }).then(res => res.data)
}

export async function authentication (query: {
  access_token: string
}) {
  return request<string>({
    method: 'POST',
    url: '/application/authentication',
    data: {
      access_token: query.access_token,
    },
  }).then(res => res.data)
}
