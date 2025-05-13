import type { RestFetchMiddleware } from '@vunk/shared/fetch'
import { restFetch } from '@vunk/shared/fetch'

restFetch.baseURL = '/api'

const tokenMiddleware: RestFetchMiddleware = async ({ req }, next) => {
  const { requestOptions } = req
  if (!requestOptions.headers) {
    requestOptions.headers = {}
  }
  const token = localStorage.getItem('accessToken')
  if (token && !requestOptions.headers.Authorization) {
    requestOptions.headers.Authorization = token
  }
  await next()
}

restFetch.addMiddleware(tokenMiddleware)
