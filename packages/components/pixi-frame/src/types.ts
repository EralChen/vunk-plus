import type { NormalObject, ReturnVoid } from '@vunk/shared'
import type { Application, Sprite } from 'pixi.js'

export interface Datum {
  src: string
  [key: string]: any
}

export interface ResizeEvent {
  application: Application
  sprite: Sprite
  meta: any
}

export type Resize = (e: ResizeEvent) => ReturnVoid
