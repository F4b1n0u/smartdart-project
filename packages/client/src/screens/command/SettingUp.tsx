import React from 'react'

import PlayerManager from './player_manager/PlayerManager'
import { GameSelector } from './game_selector/GameSelector'

const SettingUp = () => {

  return (
    <>
      <GameSelector />
      <PlayerManager />
    </>
  )
}

export default SettingUp