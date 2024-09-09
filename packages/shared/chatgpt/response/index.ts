import { ChatgptSSEResponse } from './sse'
import { isPlainObject } from '@vunk/shared/object'
import { SpecialResponse } from './enum'
export * from './sse'
export * from './enum'

export const isChatgptSSEResponse = (data: any)
: data is ChatgptSSEResponse => {
  return isPlainObject(data) && !!data.conversation_id
}
export const isDoneResponse = (data: any)
: data is SpecialResponse.done => {
  return data === SpecialResponse.done
}




