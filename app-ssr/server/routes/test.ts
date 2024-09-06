import express from 'express'



export default function (app: express.Express) {
  
  const router = express.Router()

  router.get('/', (req, res, next) => {
    if (req.query.name) {
      res.json({
        name: req.query.name,
      })
    } else {
      next(new Error('no name provided'))
    }
  })

  app.use('/test', router)


}