import { GameConfig } from '../types'

import { Preview } from './Preview'
import { RunningGame } from './RunningGame'
import { Thumbnail } from './Thumbnail'

const config: GameConfig = {
  Preview: Preview,
  RunningGame: RunningGame,
  Thumbnail: Thumbnail,
  logic: (
    currentGameState,
    emit
  ) => {
    return currentGameState
  }
}

export default config