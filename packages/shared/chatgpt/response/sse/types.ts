import { ChatgptContentMessage, ChatgptConversationDetailMetadataMessage } from './message/types'

export interface ChatgptSSEResponse {
  message: ChatgptContentMessage | ChatgptConversationDetailMetadataMessage 
  conversation_id: string
  error?: string
}
