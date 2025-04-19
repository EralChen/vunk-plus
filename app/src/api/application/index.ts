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
