
import { Player, Topic } from '../../types/common'
import { GameCState, GameCConfig } from './types'

const initialGameCState: GameCState = {
  status: 'IDLE',
  nextPlayerIdByCurrentPlayerId: {},
  currentPlayerId: undefined,
  rounds: []
}

export const onEvent: GameCConfig['onEvent'] = (event, appState) => {
  const { status, players, game: gameState } = appState
  if (status != 'PLAYING_GAME' ) {
    return undefined
  }

  const { topic, action } = event

  let updateGameState = gameState || initialGameCState
  
  switch(topic) {
    case Topic.GAMES: {
      switch(action) {
        case 'START_SELECTED_GAME': {
          const nextPlayerIdByCurrentPlayerId = players
            .reduce<Record<Player['id'], Player['id']>>(
              (acc, { id }, index, arr) => {
                const nextPlayerId = arr[(index + 1) % arr.length].id;
                acc[id] = nextPlayerId;
                return acc;
              },
              {} as Record<Player['id'], Player['id']>
            )

          updateGameState = {
            ...updateGameState,
            ...initialGameCState,
            nextPlayerIdByCurrentPlayerId,
            currentPlayerId: appState.players?.[0].id,
            rounds: []
          }
        }
      }
      break;
    }

    case Topic.DARTBOARD: {
      switch(action) {
        case 'NOTIFY_THROW_LANDED': {
          if (gameState!.status !== 'RUNNING') {
            return 
          }

          if (updateGameState.rounds[updateGameState.rounds.length - 1].canFinishRound) {
            return
          }

          const { payload: location } = event
          updateGameState = {
            ...updateGameState,
            rounds: updateGameState.rounds.map((round, index, arr) => {
              if (index === arr.length - 1) {
                return {
                  ...round,
                  throws: [
                    ...round.throws,
                    { location }
                  ]
                }
              }
              return round
            })
          }

          const canFinishRound = updateGameState.rounds[updateGameState.rounds.length - 1].throws.length > 2
          updateGameState.rounds[updateGameState.rounds.length - 1].canFinishRound = canFinishRound

          break;
        }
      }
      break;
    }
    case Topic.GAME: {
      switch(action) {
        case 'START_ROUND': {
          updateGameState = {
            ...updateGameState,
            status: 'RUNNING',
            rounds: [
              ...updateGameState.rounds,
              {
                playingPlayerId: updateGameState.currentPlayerId!,
                throws: [],
                canFinishRound: false
              }
            ]
          }
          break
        }

        case 'MISS_THROW': {
          updateGameState = {
            ...updateGameState,
            status: 'RUNNING',
            rounds: updateGameState.rounds.map((round, index, arr) => {
              if (index === arr.length - 1) {
                return {
                  ...round,
                  throws: [
                    ...round.throws,
                    {} // no location as is is missed
                  ]
                }
              }
              return round
            })
          }
          break
        }

        case 'SIMULATE_THROW': {
          if (updateGameState.rounds[updateGameState.rounds.length - 1].canFinishRound) {
            return
          }
          const { payload: location } = event

          updateGameState = {
            ...updateGameState,
            status: 'RUNNING',
            rounds: updateGameState.rounds.map((round, index, arr) => {
              if (index === arr.length - 1) {
                return {
                  ...round,
                  throws: [
                    ...round.throws,
                    { location }
                  ]
                }
              }
              return round
            })
          }

          console.log(updateGameState.rounds[0].throws)
          break
        }

        case 'CANCEL_LAST_THROW': {
          updateGameState = {
            ...updateGameState,
            status: 'RUNNING',
            rounds: updateGameState.rounds.map((round, index, arr) => {
              if (index === arr.length - 1) {
                return {
                  ...round,
                  throws: round.throws.filter((_, index, arr) => index !== arr.length - 1)
                }
              }
              return round
            })
          }
          break
        }
        case 'FINISH_ROUND': {
          updateGameState = {
            ...updateGameState,
            status: 'IDLE',
            currentPlayerId: updateGameState.nextPlayerIdByCurrentPlayerId[updateGameState.currentPlayerId!] 
          }
          break
        }
      }
      const canFinishRound = updateGameState.rounds[updateGameState.rounds.length - 1].throws.length > 2
      updateGameState.rounds[updateGameState.rounds.length - 1].canFinishRound = canFinishRound
      break
    }
  }

  return updateGameState
}
