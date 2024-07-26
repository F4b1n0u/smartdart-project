import { GameConfig } from './types'
import gameAConfig from './GameA'
import gameBConfig from './GameB'
import gameCConfig from './GameC'
import { GameId } from '../../shared/src/types/common'

export const GAMES_CONFIG_MAP: Record<GameId, GameConfig> = {
  'GAME_A': gameAConfig,
  'GAME_B': gameBConfig,
  'GAME_C': gameCConfig,
}