interface SsrMetaEnv {
  SERVER_PORT?: number
  SERVER_HMR_PORT?: number
  // alias for BASE_URL，末尾无需斜杠
  VITE_BASE_URL?: string
  // VITE_BASE_URL + VITE_API_PREFIX is express base path
  VITE_API_PREFIX?: string
}

interface ImportMetaEnv {
  // express base path
  VITE_SSR_API_URL: string
}

