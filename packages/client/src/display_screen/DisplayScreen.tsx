import { useSelectedGameConfig } from './useSelectedGameConfig'
import { useSocketState } from '../useSocketState'

import { Topic, AppState } from '../../../shared/src/types/common'

const DisplayScreen = () => {
  const {
    config,
    isLoaded: isConfigLoaded
  } = useSelectedGameConfig()

  const {
    state: status,
    isLoaded: isAppStateLoaded
  } = useSocketState<Topic.GAME_SELECTOR, AppState['status']>(Topic.GAME_SELECTOR, 'status') 
  
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