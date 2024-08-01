import { GAMES_CONFIG_MAP } from '../../../../../games/src/constants'
import { AppState, GameId } from '../../../../../shared/src/types/common'
import { useCommandSocketEmit, useCommandSocketState } from '../useCommandSocket'
import { Topic } from '../../../../../shared/src/types/common'
import { FromGamesEvent } from '../../../../../shared/src/types/events/GamesEvent'
import { useSelectedGameConfig } from '../useSelectedGameConfig'

export const GameSelector = () => {
  const { emitHandler } = useCommandSocketEmit<FromGamesEvent>()
  const { config } = useSelectedGameConfig()
  const [, appState] = useCommandSocketState<AppState>('')

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