import { useDisplaySocketState } from './useDisplaySocket'

import { AppState } from '../../../../shared/src/types/common'
import { useSelectedGameConfig } from './useSelectedGameConfig'

const Screen = () => {
  const { config, isConfigLoaded } = useSelectedGameConfig()
  const [ isAppStateLoaded, status ]  = useDisplaySocketState<AppState['status']>('status') 
  
  if(isConfigLoaded && isAppStateLoaded) {
    const { Preview, ScoreBoard } = config!
    switch(status) {
      case 'PLAYING_GAME': {
        return <ScoreBoard useGameSocketState={useDisplaySocketState}/>
      }

      case 'READY_TO_PLAY': {
        return <Preview useGameSocketState={useDisplaySocketState}/>
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
    }
  } else {
    return (
      <>
        loading
      </>
    )
  }

}

export default Screen