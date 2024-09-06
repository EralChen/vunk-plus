import express from 'express'

export default function (app: express.Express) {
  const router = express.Router()

  // 设置SSE响应头
  app.get('/chat', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')



    // 模拟发送多条消息
    let messageId = 0
    const intervalId = setInterval(() => {
      messageId++
      res.write(`id: ${messageId}\n`)
      res.write(`data: 这是第 ${messageId} 条消息\n\n`)

      if (messageId === 5) {  // 示例发送5条消息后停止
        clearInterval(intervalId)
        res.end()
      }
    }, 1000)
  
    // 处理客户端断开连接
    req.on('close', () => {
      clearInterval(intervalId)
      res.end()
    })

  })


  app.use('/chat', router)
}