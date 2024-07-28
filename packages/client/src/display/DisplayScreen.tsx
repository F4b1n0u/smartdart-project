import { useSelectedGameConfig } from './useSelectedGameConfig'
import { useDisplaySocketState } from './useDisplaySocket'

import { Topic, AppState } from '../../../shared/src/types/common'

const DisplayScreen = () => {
  const {
    config,
    isLoaded: isConfigLoaded
  } = useSelectedGameConfig()

  const {
    state: status,
    isLoaded: isAppStateLoaded
  } = useDisplaySocketState<AppState['status']>('status') 
  
  if(isConfigLoaded && isAppStateLoaded) {
    const { Preview: PreviewComponent, RunningGame: RunningGameComponent } = config!
    switch(status) {
      case 'PLAYING_GAME': {
        return <RunningGameComponent />

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
  }

}

export default DisplayScreen