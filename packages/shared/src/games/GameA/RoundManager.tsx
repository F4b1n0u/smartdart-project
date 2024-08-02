import React, { useContext } from 'react';

import { AppState, Multiplier, Topic } from '../../types/common';
import { GameAConfig, GameAState } from './types';
import { AppStateContext } from '@shared/components/AppStateContext';

export const RoundManager: GameAConfig['RoundManager'] = () => {
  const { appState, emitHandler } = useContext(AppStateContext)

  if (!appState) {
    return (
      <>Loading</>
    )
  }

  const { game: gameState } = appState as AppState<GameAState>
  switch(gameState.status) {
    case 'IDLE': {
      return (
        <div>
          <button onClick={emitHandler({
            topic: Topic.GAME,
            action: 'START_ROUND',
            payload: undefined
          })}>Ready</button>
        </div>
      );
    }
    case 'RUNNING': {
      const currentRound = gameState.rounds[gameState.rounds.length - 1]
      const { canFinishRound, throws } = currentRound
      
      const canMissThrow = !canFinishRound
      const canSimulateThrow = !canFinishRound
      const canCancelLastThrow = throws.length > 0
      const canEndRound = canFinishRound
      
      console.log({currentRound, throws})
      return (
        <div>
          <button
            onClick={emitHandler({
              topic: Topic.GAME,
              action: 'MISS_THROW',
              payload: undefined
            })}
            disabled={!canMissThrow}
          >miss</button>

          <button
            onClick={emitHandler({
              topic: Topic.GAME,
              action: 'SIMULATE_THROW',
              payload: {
                score: 1,
                multiplier: Multiplier.DOUBLE
              }
            })}
            disabled={!canSimulateThrow}
          >simulate</button>

          <button
            onClick={emitHandler({
              topic: Topic.GAME,
              action: 'CANCEL_LAST_THROW',
              payload: undefined
            })}
            disabled={!canCancelLastThrow}
          >cancel last throw</button>

          <button
            onClick={emitHandler({
              topic: Topic.GAME,
              action: 'FINISH_ROUND',
              payload: undefined
            })}
            disabled={!canEndRound}
          >end round</button>
        </div>
      )
    }
  }

  
}
