import React from 'react'
import { AppStateContext } from '@shared/components/AppStateContext'
import { useEntitySocketEmit, useEntitySocketState } from '@shared/components/useEntitySocket'
import { AppState, Entity } from '@shared/types/common'
import { GAMES_CONFIG_MAP } from '@shared/games/constants'

const Screen = () => {
  const [isLoaded, appState] = useEntitySocketState<AppState>(Entity.COMMAND, '')
  const { emit, emitHandler} = useEntitySocketEmit({ entity: Entity.COMMAND })
  
  if (!isLoaded) {
    return (
      <>Loading</>
    )
  }

  const { ScoreBoard, Preview } = GAMES_CONFIG_MAP[appState!.selectedGameId]
  
  let children = null
  switch(appState?.status) {
    case 'PLAYING_GAME': {
      return <ScoreBoard />
    }
    case 'READY_TO_PLAY': {
      return <Preview />
      break;
    }
    case 'SETTING_UP': {
      return (
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

  return (
    <AppStateContext.Provider value={{
      isLoaded: !!appState,
      appState,
      emit,
      emitHandler
    }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default Screen