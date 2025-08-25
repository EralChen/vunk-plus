import type { NormalObject } from '@vunk/shared'
import type { RestFetchReaderOnmessage } from '@vunk/shared/fetch'
import { restFetch } from '@vunk/shared/fetch'

export async function agentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: NormalObject,
) {
  return restFetch.reader({
    url: '/application/chat_message/69e23792-8162-11f0-8a7b-dee062287042',
    onmessage,
  }, {
    headers: {
      authorization: 'application-8259214f7c6f2777658809d71bdfada3',
    },
    data,
  })
}
