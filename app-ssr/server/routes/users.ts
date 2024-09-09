import express from 'express'
import { createApiRoute } from '../utils/createApiRoute'

export default function (app: express.Express) {
  const router = createApiRoute(app, '/users')

  router.get('/', (req, res) => {
    res.send('Users Page')
  })

  return router
}