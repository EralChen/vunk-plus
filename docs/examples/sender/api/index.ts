import type { CustomUploadFile, UploadFile } from './types'
import { request, restFetch } from '@vunk/shared/fetch'

export * from './types'

/**
 * 知识库上传多个文件
  POST /api/dataset/appearance/upload_file
  接口ID：270839408
  接口地址：https://app.apifox.com/link/project/5957575/apis/api-270839408
  file: file
 */
export async function uploadFile (
  file: File,
  options: {
    abortController?: AbortController
  } = {},
) {
  return request<[UploadFile]>({
    url: '/dataset/assets/upload_file',
    method: 'POST',
    contentType: 'multipart/form-data',
    data: {
      file,
    },

    abortController: options.abortController,
  }).then(res => res.data[0]).then((file) => {
    return {
      ...file,
      fileId: file.file_id,
    }
  })
}

/**
 * 下载文件
  GET /api/file/{file_id}
  接口ID：270885493
  接口地址：https://app.apifox.com/link/project/5957575/apis/api-270885493
 */
export function getFileUrlSync (fileId: string) {
  return `${restFetch.baseURL}/file/${fileId}`
}

export function readFileSync (query: {
  fileId: string
}) {
  return {
    url: getFileUrlSync(query.fileId),
    name: query.fileId,
    response: {
      url: getFileUrlSync(query.fileId),
      fileId: query.fileId,
      file_id: query.fileId,
    },
  } as CustomUploadFile
}

/**
 *
文件详情
  GET /api/file/info/{file_id}
  接口ID：309680192
  接口地址：https://app.apifox.com/link/project/5957575/apis/api-309680192
 */

export async function readFile (query: {
  fileId: string
}) {
  return request<{
    file_name: string
  }>({
    url: `/file/info/${query.fileId}`,
    method: 'GET',
  }).then((res) => {
    const file = res.data
    return {
      url: getFileUrlSync(query.fileId),
      name: file.file_name,
      response: {
        url: getFileUrlSync(query.fileId),
        fileId: query.fileId,
        name: file.file_name,
        file_id: query.fileId,
      },
    } as CustomUploadFile
  })
}
