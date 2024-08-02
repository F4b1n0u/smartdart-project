import React from 'react'

import { useSelectedGameConfig } from '@shared/components/useSelectedGameConfig'

const PlayingGame = () => {
  const { isConfigLoaded, config } = useSelectedGameConfig()

  if (isConfigLoaded) {
    const { RoundManager } = config!
    
    return (
      <>
        <RoundManager />
      </>
    )
  } else {
    return (
      <>
        Loading
      </>
    )
  }
}

export default PlayingGame