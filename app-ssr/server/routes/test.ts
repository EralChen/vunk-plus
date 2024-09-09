import express from 'express'
import { createApiRoute } from '../utils/createApiRoute'

export default function (
  app: express.Express,
) {
  const router = createApiRoute(app, '/test')

  router.get('/', (req, res, next) => {
    if (req.query.name) {
      res.json({
        name: req.query.name,
      })
    } else {
      next(new Error('no name provided'))
    }
  })
  
  return router
}
