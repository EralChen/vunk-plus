import { NormalObject } from '@vunk/core'
import { appRoot } from '../../path.config'
import mri from 'mri'
import { loadEnv } from 'vite'

interface MriData {
  mode: string
}


export function getEnvInfo () {
  const argv = process.argv.slice(2)
  const mriData = mri<MriData>(argv)

  const originalMode = mriData.mode

  let envData: NormalObject = {}
  if (originalMode) {
    envData = loadEnv(originalMode, appRoot, '')
    if (envData.NODE_ENV) {
      process.env.NODE_ENV = envData.NODE_ENV
    }
  } else {
    const mode = process.env.NODE_ENV || 'development'
    envData = loadEnv(mode, appRoot, '')
  }


  return {
    isProduction: process.env.NODE_ENV === 'production',

  }

  // const env = loadEnv(mode, appRoot, '') as SsrMetaEnv
  
}

