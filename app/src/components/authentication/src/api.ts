import { request } from '@vunk/shared/fetch'

export async function rProfile () {
  return request({
    method: 'GET',
    url: '/profile',
  })
}

export async function rApplicationProfile (query: {
  access_token: string
}) {
  const Authorization = await request<string>({
    method: 'POST',
    url: '/application/authentication',
    data: {
      access_token: query.access_token,
    },
  }).then(res => res.data)

  localStorage.setItem('accessToken', Authorization)

  return request<{
    stt_model_enable: boolean
    id: string
    prologue: string
  }>({
    method: 'GET',
    url: '/application/profile',
    headers: {
      Authorization,
    },
  }).then(res => res.data)
}
