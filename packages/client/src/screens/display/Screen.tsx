import { useDisplaySocketState } from './useDisplaySocket'

import { AppState } from '../../../../shared/src/types/common'
import { useSelectedGameConfig } from './useSelectedGameConfig'

const Screen = () => {
  const { config, isConfigLoaded } = useSelectedGameConfig()

  const [isAppStateLoaded, status]  = useDisplaySocketState<AppState['status']>('status') 
  
  if(isConfigLoaded && isAppStateLoaded) {
    const { Preview: PreviewComponent, ScoreBoard } = config!
    switch(status) {
      case 'PLAYING_GAME': {
        return <ScoreBoard />

        break;
      }

      case 'READY_TO_PLAY': {
        return <PreviewComponent />
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