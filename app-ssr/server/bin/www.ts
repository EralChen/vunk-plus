import { createApp } from '../app'
import debuger from 'debug'
import http from 'http'
import mri from 'mri'
import { appRoot } from '../../path.config'
import { loadEnv } from 'vite'
import consola from 'consola'
import os from 'os'
import express from 'express'

interface MriData {
  mode: string
}

const argv = process.argv.slice(2)
const mriData = mri<MriData>(argv)
const debug = debuger('http')
const isProduction = process.env.NODE_ENV === 'production'
const mode = mriData.mode || (
  isProduction ? 'production' : 'development'
)
const env = loadEnv(mode, appRoot, '') as SsrMetaEnv
const port = normalizePort(env.SERVER_PORT ?? 3000) 

const base = env.VITE_BASE_URL ?? '/'

const networks = getNetworks()


const app = express()


createServer()

async function createServer () {
  const mainApp = await createApp()
  app.use(base, mainApp)

  // https://www.npmjs.com/package/debug#windows-command-prompt-notes

  const server = http.createServer(app)

  server.listen(port)
  server.on('error', onError)
  server.on('listening', () => listeningHandler(server))
  
}



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val: string | number) {
  const port = parseInt(val + '', 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    consola.error(bind + ' requires elevated privileges')
    process.exit(1)
  case 'EADDRINUSE':
    consola.error(bind + ' is already in use')
    process.exit(1)
  default:
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function listeningHandler (server: http.Server) {
  const addr = server.address()
  if (!addr) return

  if (typeof addr === 'string') {
    debug(`Listening on pipe ${addr}`)
  } else {
    const addrStr = addr.address
    if (addrStr === '::') {
      networks.forEach((network) => {
        consola.ready(`Listening on ${network}${env.VITE_BASE_URL ?? ''}`)
      })
    }
  }
}


// 获取所有网络接口的函数
function getNetworks () {
  const interfaces = os.networkInterfaces()
  const networks: string[] = []
  for (const name of Object.keys(interfaces)) {
    const item = interfaces[name]
    if (!item) {
      continue
    }
    for (const iface of item) {
      if (
        'IPv4' !== iface.family 
        || iface.internal !== false
      ) {
        // 跳过本地主机和非 ipv4 地址
        continue
      }


      networks.push(
        `http://${iface.address}:${port}`,
      )
    
    }
  }

  return networks
}

