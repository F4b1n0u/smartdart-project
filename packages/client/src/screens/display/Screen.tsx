import React from 'react'

import { AppState, Entity } from '@shared/types/common'
import { AppStateContext } from '@shared/components/AppStateContext'
import { GAMES_CONFIG_MAP } from '@shared/games/constants'
import { useEntitySocketState } from '@shared/components/useEntitySocket'

const Screen = () => {
  const [isLoaded, appState] = useEntitySocketState<AppState>(Entity.DISPLAY, '')
  

  let children = null

  if (!isLoaded) {
    children = (
      <>Loading</>
    )
  } else {
    const { ScoreBoard, Preview } = GAMES_CONFIG_MAP[appState!.selectedGameId]
  
    switch(appState?.status) {
      case 'PLAYING_GAME': {
        children = <ScoreBoard />
        break
      }
      case 'READY_TO_PLAY': {
        children = <Preview />
        break;
      }
      case 'SETTING_UP': {
        children = (
          <>
            Setting up
          </>
        )
        break;
      }
  
      default: {
        children = (
          <>Loading</>
        )
      }
    }
  }

  return (
    <AppStateContext.Provider value={{
      isLoaded,
      appState,
    }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default Screen