interface SsrMetaEnv {

  SERVER_PORT?: number
  SERVER_HMR_PORT?: number
  VITE_BASE_URL?: string
  VITE_SSR_API_URL?: string
}

interface ImportMetaEnv {
  VITE_SSR_API_URL: string
}
