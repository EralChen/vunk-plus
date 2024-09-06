import { series } from 'gulp'
import componentToPkgsDir from './component'

export interface MriData {
  name: string // aaa-bbb
}

export default series(
  componentToPkgsDir,
)
