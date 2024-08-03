
import React, { useContext } from 'react'

import { GameId } from '@shared/types/common'
import { Topic } from '@shared/types/common'
import { GAMES_CONFIG_MAP } from '@shared/games/constants'
import { AppStateContext } from '@shared/components/AppStateContext'
import { useSelectedGameConfig } from '@shared/components/useSelectedGameConfig'

export const GameSelector = () => {
  const { appState, emitHandler } = useContext(AppStateContext)
  const { config } = useSelectedGameConfig()

  const isPlayable = (config && appState) && config.isPlayable(appState)

  return (
    <div>
      {
        Object.values(GameId).map(gameId => {
          const { Thumbnail: ThumbnailComponent } = GAMES_CONFIG_MAP[gameId]

          return (
            <button
              key={gameId}
              onClick={emitHandler({
                topic: Topic.GAMES,
                action: 'SELECT_GAME',
                payload: gameId
              })}
            >
              <ThumbnailComponent />
            </button>
          )
        })
      }
      <button
        onClick={emitHandler({
          topic: Topic.GAMES,
          action: 'START_SELECTED_GAME',
          payload: undefined
        })}
        disabled={!isPlayable}
      >
        Play
      </button>
    </div>
  )
}