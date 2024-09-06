import express from 'express'

export default function (app: express.Express) {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.send('Users Page')
  })

  app.use('/users', router)
}