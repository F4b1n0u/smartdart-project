import { GAMES_CONFIG_MAP } from "../../../../games/src/constants"
import { GameId } from "../../../../shared/src/types/common"
import { useSocketEmit } from '../../useSocketEmit'
import { Topic } from '../../../../shared/src/types/common'
import { FromGameSelectorEvent } from '../../../../shared/src/types/events/GameSelectorEvent'

export const GameSelector = () => {
  const { emitHandler } = useSocketEmit<FromGameSelectorEvent>(Topic.GAME_SELECTOR)

  return (
    <div>
      {
        Object.values(GameId).map(gameId => {
          const { Thumbnail: ThumbnailComponent } = GAMES_CONFIG_MAP[gameId]
          return (
            <button
              onClick={emitHandler({ action: 'FOCUS_GAME', payload: gameId })}
            >
              <ThumbnailComponent />
            </button>
          )
        })
      }
      <button
        onClick={emitHandler({ action: 'START_SELECTED_GAME', payload: undefined })}
      >
        Play
      </button>
    </div>
  )
}