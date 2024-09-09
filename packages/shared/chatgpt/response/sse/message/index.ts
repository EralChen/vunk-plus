import { ChatgptContentMessage, ChatgptConversationDetailMetadataMessage } from './types'

export * from './types'


export const isContentMessage = (message: any): 
message is ChatgptContentMessage => {
  return message?.id && message?.content
}

export const isConversationDetailMetadataMessage = (message: any)
: message is ChatgptConversationDetailMetadataMessage => {
  return message?.type === 'conversation_detail_metadata'
}

