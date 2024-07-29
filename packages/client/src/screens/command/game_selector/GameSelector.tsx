import { GAMES_CONFIG_MAP } from '../../../../../games/src/constants'
import { GameId } from '../../../../../shared/src/types/common'
import { useCommandSocketEmit } from '../useCommandSocket'
import { Topic } from '../../../../../shared/src/types/common'
import { FromGamesEvent } from '../../../../../shared/src/types/events/GamesEvent'

export const GameSelector = () => {
  const { emitHandler } = useCommandSocketEmit<FromGamesEvent>()

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
      >
        Play
      </button>
    </div>
  )
}