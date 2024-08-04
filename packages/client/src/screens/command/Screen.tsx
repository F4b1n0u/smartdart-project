import React, { useContext } from 'react'
import { AppState, Entity } from '../../../../shared/src/types/common'
import { AppStateContext } from '@shared/components/AppStateContext'
import ReadyToPlay from './ReadyToPlay'
import PlayingGame from './PlayingGame'
import SettingUp from './SettingUp'
import { useEntitySocketEmit, useEntitySocketState } from '@shared/components/useEntitySocket'
import { useDartBoard } from '../../dartboard/useDartBoard'

const DartboardWrapper = ({ children }: { children: React.ElementType }) => {
  const { isLoaded, appState } = useContext(AppStateContext)
  const { connect } = useDartBoard()

  return (
    <>
      {children}
      {isLoaded && appState?.dartboardConnection === 'MISSING' && <button onClick={connect}>connect to dartboard</button>}
    </>
    
  )
}

const Screen = () => {
  const [, appState] = useEntitySocketState<AppState>(Entity.COMMAND, '')
  const { emit, emitHandler} = useEntitySocketEmit({ entity: Entity.COMMAND })
  
  let content = null
  switch(appState?.status) {
    case 'PLAYING_GAME': {
      content = (
        <PlayingGame />
      )
      break;
    }
    case 'READY_TO_PLAY': {
      content = (
        <ReadyToPlay />
      )
      break;
    }
    case 'SETTING_UP': {
      content = (
        <SettingUp />
      )
      break;
    }

    default: {
      content = (
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
      <DartboardWrapper>
        {content}
      </DartboardWrapper>
    </AppStateContext.Provider>
  )
}

export default Screen