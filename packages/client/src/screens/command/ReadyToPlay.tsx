import React from 'react'
import PlayerManager from './player_manager/PlayerManager'
import { GameSelector } from './game_selector/GameSelector'

const ReadyToPlay = () => {
  return (
    <>
      <GameSelector />
      <PlayerManager />
    </>
  )
}

export default ReadyToPlay