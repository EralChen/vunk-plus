import type { ReturnVoid } from '@vunk/shared'
import type { Application, Sprite } from 'pixi.js'

export interface ResizeEvent {
  application: Application
  sprite: Sprite
}

export type Resize = (e: ResizeEvent) => ReturnVoid
