import type {
  FileRef,
  FileViewerDocumentAnchor,
  FileViewerLifecycleContext,
  FileViewerOperationAvailability,
  FileViewerOperationContext,
  FileViewerOptions,
  FileViewerSearchState,
  FileViewerViewStateChange,
  FileViewerZoomState,
  ViewerFitResult,
} from '@file-viewer/vue3'
import type { PropType } from 'vue'

export type ResolvedViewerTheme = 'light' | 'dark'

export const props = {
  /**
   * @description 本地文件来源，推荐传入带正确扩展名的 File
   */
  file: {
    type: [Object, Blob, ArrayBuffer] as PropType<FileRef>,
    default: undefined,
  },

  /**
   * @description 远程文件地址
   */
  url: {
    type: String,
    default: undefined,
  },

  /**
   * @description 文件名，用于辅助推断扩展名
   */
  name: {
    type: String,
    default: undefined,
  },

  /**
   * @description 文件名，等价于 name
   */
  filename: {
    type: String,
    default: undefined,
  },

  /**
   * @description 显式指定扩展名或 MIME 线索
   */
  type: {
    type: String,
    default: undefined,
  },

  /**
   * @description 文件大小提示
   */
  size: {
    type: Number,
    default: undefined,
  },

  /**
   * @description 完整预览器配置
   */
  options: {
    type: Object as PropType<FileViewerOptions>,
    default: undefined,
  },
}

export const emits = {
  'load-start': (_: FileViewerLifecycleContext) => true,
  'load-complete': (_: FileViewerLifecycleContext) => true,
  'unload-start': (_: FileViewerLifecycleContext) => true,
  'unload-complete': (_: FileViewerLifecycleContext) => true,
  'operation-before': (_: FileViewerOperationContext) => true,
  'operation-cancel': (_: FileViewerOperationContext) => true,
  'operation-availability-change': (_: FileViewerOperationAvailability) => true,
  'search-change': (_: FileViewerSearchState) => true,
  'location-change': (_: FileViewerDocumentAnchor | null) => true,
  'zoom-change': (_: FileViewerZoomState) => true,
  'view-state-change': (_: FileViewerViewStateChange) => true,
  'fit-change': (_: ViewerFitResult) => true,
  'theme-change': (_: ResolvedViewerTheme) => true,
}