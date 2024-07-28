import { GameStateA } from './types'
import { GameConfig } from '../types'

import { Preview } from './Preview'
import { ScoreBoard } from './ScoreBoard'
import { Thumbnail } from './Thumbnail'
import { Outcome } from './Outcome'
import { RoundManager } from './RoundManager'

const config: GameConfig<GameStateA> = {
  Preview,
  ScoreBoard,
  Thumbnail,
  Outcome,
  RoundManager,
  logic: () => {
    return {}
  },
  // can check here for minimum amount of player for example
  isPlayable: () => true
}

export * from './types'

export default config