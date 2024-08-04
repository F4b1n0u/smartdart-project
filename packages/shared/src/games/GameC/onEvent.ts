
import { MULTIPLIER_TO_NUMBER, Player, Topic } from '../../types/common'
import { GameCState, GameCConfig } from './types'

const initialGameCState: GameCState = {
  status: 'IDLE',
  nextPlayerIdByCurrentPlayerId: {},
  currentPlayerId: undefined,
  rounds: [],
  maxThrowsPerRound: 3
}

const TARGET_SCORE = 100

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

          let currentRound = updateGameState.rounds.find(({ status }) => status === 'IN_PROGRESS')!
          if (currentRound.canFinishRound) {
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
          currentRound = updateGameState.rounds.find(({ status }) => status === 'IN_PROGRESS')!
          const canFinishRound = currentRound.throws.length > 2
          currentRound.canFinishRound = canFinishRound

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
                status: 'IN_PROGRESS',
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
          const currentRound = updateGameState.rounds.find(({ status }) => status === 'IN_PROGRESS')!
          if (currentRound.canFinishRound) {
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
          const totalScorePerPlayerId = players.reduce<Record<Player['id'], number>>((lookup, { id }) => {
            const playerTotal = gameState!.rounds.filter(({ playingPlayerId }) => playingPlayerId === id).reduce(
              (total, { throws }) => total + throws.reduce(
                (acc, { location }) =>
                  acc + (
                    location
                      ? location.score * MULTIPLIER_TO_NUMBER[location.multiplier]
                      : 0
                  ),
                0
              ),
              0
            )
            
            return {
              ...lookup,
              [id]: playerTotal
            }
          }, {})

          const rankPlayers = (playerScores: Record<Player['id'], number>) => {
            // Convert the map into an array of objects { playerId, score }
            const playersArray = Object.entries(playerScores).map(([playerId, score]) => ({
              playerId,
              score
            }));
          
            // Sort the array by score in descending order
            playersArray.sort((a, b) => b.score - a.score);
          
            return playersArray;
          }

          const [{score: highestScore}, ] = rankPlayers(totalScorePerPlayerId)

          const isGameOver = highestScore > TARGET_SCORE

          updateGameState = {
            ...updateGameState,
            status: isGameOver ? 'FINISHED' :'IDLE',
            currentPlayerId: updateGameState.nextPlayerIdByCurrentPlayerId[updateGameState.currentPlayerId!],
            rounds: updateGameState.rounds.map((round, index, arr) => {
              if (index === arr.length - 1) {
                return {
                  ...round,
                  status: 'FINISHED'
                }
              }
              return round
            })
          }
          break
        }
      }
      const currentRound = updateGameState.rounds.find(({ status }) => status === 'IN_PROGRESS')!
      if (currentRound) {
        const canFinishRound = currentRound.throws.length > 2
        currentRound.canFinishRound = canFinishRound
      }
      
      break
    }
  }

  return updateGameState
}
