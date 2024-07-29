import { useCommandSocketState } from './useCommandSocket'

import { GAMES_CONFIG_MAP } from '../../../../games/src/constants'
import { GameId } from '../../../../shared/src/types/common'

export const useSelectedGameConfig = () => {
  const [isSelectedGameIdLoaded, selectedGameId] = useCommandSocketState<GameId>('selectedGameId')

  return {
    config: selectedGameId && GAMES_CONFIG_MAP[selectedGameId],
    isConfigLoaded: isSelectedGameIdLoaded
  }
}