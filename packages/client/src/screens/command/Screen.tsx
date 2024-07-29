import { AppState } from '../../../../shared/src/types/common'
import { useCommandSocketState } from './useCommandSocket'
import ReadyToPlay from './ReadyToPlay'
import PlayingGame from './PlayingGame'
import SettingUp from './SettingUp'
import { useGameLogic } from './useGameLogic'

const Screen = () => {
  const [, status]  = useCommandSocketState<AppState['status']>('status') 

  console.log({status})

  useGameLogic()
  
  switch(status) {
    case 'PLAYING_GAME': {
      return (
        <PlayingGame />
      )
      break;
    }
    case 'READY_TO_PLAY': {
      return (
        <ReadyToPlay />
      )
      break;
    }
    case 'SETTING_UP': {
      return (
        <SettingUp />
      )
      break;
    }
  }
}

export default Screen