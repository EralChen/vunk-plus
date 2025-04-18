import type { NormalObject } from '@vunk/shared'
import type { RestFetchReaderOnmessage } from '@vunk/shared/fetch'
import { RestFetch } from '@vunk/shared/fetch'
import { ElementPlusRestFetchPlugin } from '@vunk/shared/fetch/ElementPlusRestFetchPlugin'

export const restFetch = new RestFetch({
  baseURL: 'http://localhost:3000',
})

restFetch.use(ElementPlusRestFetchPlugin)

export async function agentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: NormalObject,
) {
  return restFetch.reader({
    url: '/api/application/chat_message/231593fc-1b84-11f0-9ed6-10ffe00db574',
    onmessage,
  }, {
    headers: {
      authorization: 'application-18a5cf747c3dfc2689cb4b5880c2db02',
    },
    data,
  })
}
