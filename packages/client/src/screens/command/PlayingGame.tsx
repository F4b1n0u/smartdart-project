import { useSelectedGameConfig } from './useSelectedGameConfig'
import { useCommandSocketState, useCommandSocketEmit } from './useCommandSocket'

const PlayingGame = () => {
  const { isConfigLoaded, config } = useSelectedGameConfig()

  if (isConfigLoaded) {
    const { RoundManager, ScoreBoard } = config!
    
    return (
      <>
        <RoundManager useGameSocketEmit={useCommandSocketEmit} useGameSocketState={useCommandSocketState}/>
        <ScoreBoard useGameSocketEmit={useCommandSocketEmit} useGameSocketState={useCommandSocketState}/>
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