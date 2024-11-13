import { NonVoidable } from '@vunk/core'
import Vditor from 'vditor'
import { Emitter } from 'mitt'

export type DefaultOptions = NonVoidable<ConstructorParameters<typeof Vditor>[1]>


export type Toolbar = DefaultOptions['toolbar']

export type Mitter = Emitter<{
  input: string
}>

export {}
