import { useDisplaySocketState } from './useDisplaySocket'

import { GAMES_CONFIG_MAP } from '../../../../games/src/constants'
import { GameId } from '../../../../shared/src/types/common'

export const useSelectedGameConfig = () => {
  const [isSelectedGameIdLoaded, selectedGameId] = useDisplaySocketState<GameId>('selectedGameId')

  return {
    config: selectedGameId && GAMES_CONFIG_MAP[selectedGameId],
    isConfigLoaded: isSelectedGameIdLoaded
  }
}