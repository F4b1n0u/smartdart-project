import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppState, INDEX_TO_SCORE, Multiplier, SCORE_TO_INDEX, Topic } from '../../types/common';
import { GameBConfig, GameBState } from './types';
import { AppStateContext } from '@shared/components/AppStateContext';

const Dart = styled.img`
  width: 50px;
`;

const Throws = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: 'space-between';
`

const Photo = styled.img`
  width: 100px;
  height: 100px;
  background: #ddd;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;

export const RoundManager: GameBConfig['RoundManager'] = () => {
  const { appState, emitHandler } = useContext(AppStateContext)
  const { game: gameState } = appState as AppState<GameBState>

  if (!appState || !gameState) {
    return (
      <>Loading</>
    )
  }

  let children = null

  switch(gameState.status) {
    case 'IDLE': {
      children = (
        <div>
          <button onClick={emitHandler?.({
            topic: Topic.GAME,
            action: 'START_ROUND',
            payload: undefined
          })}>Ready</button>
        </div>
      );
      break
    }
    case 'RUNNING': {
      const currentRound = gameState.rounds[gameState.rounds.length - 1]
      const { canFinishRound, throws } = currentRound

      const canMissThrow = !canFinishRound
      const canSimulateThrow = !canFinishRound
      const canCancelLastThrow = throws.length > 0
      const canEndRound = canFinishRound
      
      children = (
        <div>
          <Throws>
          {
            throws.map(({ location }, index) => (
              <React.Fragment key={index}>
                <Dart key={index} src="/dart.png" />
                <span>{location ? `${location.score} - ${location.multiplier}` : 'MISS' }</span>
              </React.Fragment>
              
            ))
          }
          </Throws>
          

          <button
            onClick={emitHandler?.({
              topic: Topic.GAME,
              action: 'MISS_THROW',
              payload: undefined
            })}
            disabled={!canMissThrow}
          >
            miss
          </button>

          <button
            onClick={emitHandler?.({
              topic: Topic.GAME,
              action: 'SIMULATE_THROW',
              payload: {
                score: 20,
                multiplier: Multiplier.SINGLE_FAT,
                index: SCORE_TO_INDEX[20]
              }
            })}
            disabled={!canSimulateThrow}
          >
            simulate 1 x2
          </button>

          <button
            onClick={emitHandler?.({
              topic: Topic.GAME,
              action: 'CANCEL_LAST_THROW',
              payload: undefined
            })}
            disabled={!canCancelLastThrow}
          >
            cancel last throw
          </button>

          <button
            onClick={emitHandler?.({
              topic: Topic.GAME,
              action: 'FINISH_ROUND',
              payload: undefined
            })}
            disabled={!canEndRound}
          >
            end round
          </button>
        </div>
      )

      break;
    }
  }

  const { currentPlayerId } = gameState
      
  const { players } = appState
  const playingPlayer = players.find(({ id }) => id === currentPlayerId)!


  return (
    <>
      <Photo src={playingPlayer.photo || 'photo'} alt="Player" />
      <h3>{playingPlayer.name}</h3>
      {children}
    </>
  )
}
