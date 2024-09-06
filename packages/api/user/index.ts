// import { restFetch } from '@skzz/platform/shared/fetch/platform'
import { User } from './types'

export type * from './types'

export const rUsers = () => {
  return new Promise<User[]>((resolve) => {
    resolve([
      {
        id: '1',
        name: 'John Doe',
        email: 'xxxxxx',
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'xxxxxx',
      },

    ])
  })
}