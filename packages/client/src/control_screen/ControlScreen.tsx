import { useDartBoard } from '../useDartBoard'
import PlayerManager from './player_manager/PlayerManager'
import { GameSelector } from './game_selector/GameSelector'

const ControlScreen = () => {
  const { connect } = useDartBoard()

  return (
    <>
      <GameSelector />
      <PlayerManager />

      <button onClick={connect}>connect to dartboard</button>
    </>
  )
}

export default ControlScreen