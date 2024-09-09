


export interface ChatgptConversationDetailMetadataMessage {
  type: 'conversation_detail_metadata'
  blocked_features: string[]
  model_limits: string[]
  default_model_slug: string
  conversation_id: string
}

export interface ChatgptContentMessage {
  id: string // 消息ID
  content: ChatgptContent // 消息内容
}

export interface ChatgptContent {
  content_type: 'text'
  parts: string[]
}





