import { GAMES_CONFIG_MAP } from '@shared/games/constants'
import { useContext } from 'react'
import { AppStateContext } from '@shared/components/AppStateContext'

export const useSelectedGameConfig = () => {
  const { appState, isLoaded } = useContext(AppStateContext)

  return {
    config: isLoaded && appState ? GAMES_CONFIG_MAP[appState.selectedGameId] : undefined,
    isConfigLoaded: isLoaded,
  }
}