import express from 'express'
import { readSsrMetaEnv } from './readSsrMetaEnv'


export const createApiRoute = (
  app: express.Express, 
  path: string,
) => {
  const env = readSsrMetaEnv()
  const base = env.VITE_API_PREFIX ?? ''

  const router = express.Router()
  // 处理跨域
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })
      
  app.use(`${base}${path}`, router)

  return router
}
