import { request } from '@vunk/shared/fetch'

export async function speechToText (
  query: {
    application_id: string
    file: File
  },
) {
  return request({
    method: 'POST',
    contentType: 'multipart/form-data',
    url: `/application/${query.application_id}/speech-to-text`,
    data: {
      file: query.file,
    },
  })
}
