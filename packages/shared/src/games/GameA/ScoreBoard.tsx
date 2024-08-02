import 'react'
import { AppStateContext } from '@shared/components/AppStateContext';
import React, { useContext } from 'react';
import { GameAState } from './types';

import styled from 'styled-components';
import { Player } from '@shared/types/common';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
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

export const ScoreBoard = () => {
  const { appState } = useContext(AppStateContext)

  if (!appState) {
    return (
      <>Loading</>
    )
  }

  const { players } = appState
  const gameState: GameAState = appState.game as GameAState

  const { currentPlayerId } = gameState
  const currenPlayer = players.find(({ id }) => id === currentPlayerId)


  return (
    <>
      <span>Game A Scoreboard</span>

      {currenPlayer && (
        <PlayerComponent {...currenPlayer}/>
      )}
    </>
  )
}