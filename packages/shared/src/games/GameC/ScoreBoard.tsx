import 'react'
import { AppStateContext } from '@shared/components/AppStateContext';
import { VirtualDartBoard } from '@shared/components/VirtualDartBoard';
import React, { useContext } from 'react';
import { GameCState } from './types';

import styled from 'styled-components';
import { Player } from '@shared/types/common';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 150px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  background: #ddd;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;

const PlayerComponent = ({ photo, name }: Player) => {
  return (
    <CardWrapper>
      <Photo src={photo || 'photo'} alt="Player" />
      <h3>{name}</h3>
    </CardWrapper>
  );
};

const Loading = () => (
  <>Loading</>
)

export const ScoreBoard = () => {
  const { isLoaded, appState } = useContext(AppStateContext)

  if (!isLoaded || !appState) {
    return <Loading />
  }

  const { players } = appState
  const gameState: GameCState = appState.game as GameCState

  if (!gameState) {
    return <Loading />
  }

  const { currentPlayerId, rounds } = gameState
  const currenPlayer = players.find(({ id }) => id === currentPlayerId)

  const currentRound = rounds[rounds.length - 1]

  const throws = currentRound?.throws
    .filter(({ location }) => !!location)

  return (
    <>
      <span>Game C Scoreboard</span>

      {currenPlayer && (
        <PlayerComponent {...currenPlayer}/>
      )}

      <VirtualDartBoard
        center={{ x: 100, y: 100}}
        scale={1}
        height={200}
        width={200}
        throws={throws}
      />
    </>
  )
}