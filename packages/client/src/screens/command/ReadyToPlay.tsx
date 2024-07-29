import { useDartBoard } from '../../dartboard/useDartBoard'
import PlayerManager from './player_manager/PlayerManager'
import { GameSelector } from './game_selector/GameSelector'

const ReadyToPlay = () => {
  const { connect } = useDartBoard()

  return (
    <>
      <GameSelector />
      <PlayerManager />

      <button onClick={connect}>connect to dartboard</button>
    </>
  )
}

export default ReadyToPlay