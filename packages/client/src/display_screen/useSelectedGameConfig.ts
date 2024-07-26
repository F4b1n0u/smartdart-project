import { useSocketState } from '../useSocketState'

import { GAMES_CONFIG_MAP } from '../../../games/src/constants'
import { Topic, GameId } from '../../../shared/src/types/common'

export const useSelectedGameConfig = () => {
  const { state: selectedGameId, isLoaded } = useSocketState<Topic.GAME_SELECTOR, GameId>(Topic.GAME_SELECTOR, 'selectedGameId')

  return {
    config: selectedGameId && GAMES_CONFIG_MAP[selectedGameId],
    isLoaded
  }
}