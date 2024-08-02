import React from 'react'
import { AppState, Entity } from '../../../../shared/src/types/common'
import { AppStateContext } from '@shared/components/AppStateContext'
import ReadyToPlay from './ReadyToPlay'
import PlayingGame from './PlayingGame'
import SettingUp from './SettingUp'
import { useEntitySocketEmit, useEntitySocketState } from '@shared/components/useEntitySocket'

const Screen = () => {
  const [, appState] = useEntitySocketState<AppState>(Entity.COMMAND, '')
  const { emit, emitHandler} = useEntitySocketEmit({ entity: Entity.COMMAND })
  
  let children = null
  switch(appState?.status) {
    case 'PLAYING_GAME': {
      children = (
        <PlayingGame />
      )
      break;
    }
    case 'READY_TO_PLAY': {
      children = (
        <ReadyToPlay />
      )
      break;
    }
    case 'SETTING_UP': {
      children = (
        <SettingUp />
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