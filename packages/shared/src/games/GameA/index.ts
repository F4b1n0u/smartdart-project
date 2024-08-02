import { GameAConfig  } from './types'

import { Preview } from './Preview'
import { ScoreBoard } from './ScoreBoard'
import { Thumbnail } from './Thumbnail'
import { Outcome } from './Outcome'
import { RoundManager } from './RoundManager'
import { onEvent } from './onEvent'

const config: GameAConfig = {
  Preview,
  ScoreBoard,
  Thumbnail,
  Outcome,
  RoundManager,
  onEvent,
  // can check here for minimum amount of player for example
  isPlayable: (appState) => appState.players.length > 1
}

export * from './types'

export default config