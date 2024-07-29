import { GameAState, FromGameAEvent, GameAConfig  } from './types'

import { Preview } from './Preview'
import { ScoreBoard } from './ScoreBoard'
import { Thumbnail } from './Thumbnail'
import { Outcome } from './Outcome'
import RoundManager from './RoundManager'
import { Player, Topic } from '../../../shared/src/types/common'

const initialGameAState: GameAState = {
  nextPlayerIdByCurrentPlayerId: {},
  currentPlayerId: undefined,
  rounds: []
}

const config: GameAConfig = {
  Preview,
  ScoreBoard,
  Thumbnail,
  Outcome,
  RoundManager,
  onEvent: (event, appState) => {
    const { status, game: gameState, players } = appState
    if (status != 'PLAYING_GAME' ) {
      return undefined
    }

    const { topic, action } = event

    switch(topic) {
      case Topic.GAME: {
        switch(action) {
          case 'INITIALIZE': {
            const nextPlayerIdByCurrentPlayerId = players
              .reduce<Record<Player['id'], Player['id']>>(
                (acc, { id }, index, arr) => {
                  const nextPlayerId = arr[(index + 1) % arr.length].id;
                  acc[id] = nextPlayerId;
                  return acc;
                },
                {}
              )

            return {
              ...initialGameAState,
              nextPlayerIdByCurrentPlayerId,
              currentPlayer: appState.players?.[0].id,
              rounds: []
            }
          }
        }
      }
      // case Topic.ROUNDS: {
      //   switch(action) {
      //     case 'START_ROUND': {
      //       return {
      //         ...gameState,
      //         rounds: [
      //           ...gameState.rounds,
      //           {
      //             playingPlayerId: appState.game.currentPlayer,
      //             throws: []
      //           }
      //         ]
      //       }
      //     }
      //   }
      // }
      default: {
        return gameState
      }
    }
  },
  // can check here for minimum amount of player for example
  isPlayable: () => true
}

export * from './types'

export default config