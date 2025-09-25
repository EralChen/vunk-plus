import type Player from 'xgplayer'
import { inject, provide } from 'vue'

const provideKey = '_s_vk_xgplayer'

export function providePlayer (player: Player) {
  provide(provideKey, player)
}
export function usePlayer () {
  const player = inject<Player>(provideKey)
  if (!player) {
    throw new Error('usePlayer must be used after providePlayer')
  }
  return player
}
