import { useDisplaySocketState } from './useDisplaySocket'

import { GAMES_CONFIG_MAP } from '../../../games/src/constants'
import { GameId } from '../../../shared/src/types/common'

export const useSelectedGameConfig = () => {
  const { state: selectedGameId, isLoaded } = useDisplaySocketState<GameId>('selectedGameId')

  return {
    config: selectedGameId && GAMES_CONFIG_MAP[selectedGameId],
    isLoaded
  }
}