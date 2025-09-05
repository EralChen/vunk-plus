import type { UploadUserFile } from 'element-plus'

export interface UploadFile {
  name: string
  url: string
  file_id: string
}

export type CustomUploadFile = UploadUserFile & {
  raw?: File & {
    promise: Promise<any>
    controller: AbortController
  }
  response: UploadFile
}
