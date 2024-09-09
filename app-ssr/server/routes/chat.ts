import express from 'express'
import { createApiRoute } from '../utils/createApiRoute'
import readline from 'readline'
import fs from 'fs'
import path from 'path'
const chatTxtPath = path.resolve(__dirname, '../static/chat.txt')

export default function (app: express.Express) {
  const router = createApiRoute(app, '/chat')

  // 设置SSE响应头
  router.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')


    const endLine = 'data: [DONE]'
    // 创建一个读取流
    const fileStream = fs.createReadStream(chatTxtPath, { 
      encoding: 'utf-8', 
    })

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    // 逐行发送消息
    const lines: string[] = []
    rl.on('line', (line) => {
      if (line === '') return
      lines.push(line)
    })
    // 文件读取完成后发送结束事件
    rl.on('close', () => {
      lines.push(endLine)
    })
    
    
    // 每隔1秒发送一次消息
    const intervalId = setInterval(() => {
      if (lines.length > 0) {
        const line = lines.shift()
        res.write(`${line}\n\n`)

        if (line === endLine) {
          rl.close()
          clearInterval(intervalId)
          res.end()
        }
      }
    }, 60)




    // 处理客户端断开连接
    req.on('close', () => {
      rl.close()
      clearInterval(intervalId)
      res.end()
    })

  })


  return router
}