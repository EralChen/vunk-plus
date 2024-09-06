import { restFetch } from '@vunk-plus/shared/fetch/ssr'

restFetch.baseURL = import.meta.env.VITE_SSR_API_URL
