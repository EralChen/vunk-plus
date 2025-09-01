import type { __VkBroadcastingMarkdown } from '@vunk-plus/components/broadcasting-markdown'
import {
  textToSpeech as _textToSpeech,
  authentication,
} from '#/api/application'

let authenticationPromise: null | Promise<any> = null

export async function textToSpeech (text: string) {
  if (!authenticationPromise) {
    authenticationPromise = authentication({
      access_token: '21c0f2a5067fb1cb',
    }).then((res) => {
      localStorage.setItem('accessToken', res)
      sessionStorage.setItem('accessToken', res)
    })
  }

  await authenticationPromise

  return _textToSpeech({
    application_id: '2c0946f4-02f0-11f0-b881-0242ac170002',
    text,
  }).then((res) => {
    // blob 转 data url
    return res
  })
}
