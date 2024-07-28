import { useDartBoard } from '../../dartboard/useDartBoard'
import PlayerManager from './player_manager/PlayerManager'
import { GameSelector } from './game_selector/GameSelector'
import { useCommandSocketState } from './useCommandSocket'
import { AppState } from '../../../../shared/src/types/common'

const Screen = () => {
  const { connect } = useDartBoard()
  const [, status] = useCommandSocketState<AppState['status']>('status')

  switch(status) {
    case 'PLAYING_GAME': {
      return (
        <>
          Playing
        </>
      )
      break;
    }
    case 'READY_TO_PLAY': {
      return (
        <>
          <GameSelector />
          <PlayerManager />
    
          <button onClick={connect}>connect to dartboard</button>
        </>
      )
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

export default Screen