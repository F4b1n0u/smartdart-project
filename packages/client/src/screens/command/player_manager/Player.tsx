import React from 'react';
import styled from 'styled-components';
import { Player } from '../../../../../shared/src/types/common';

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

type PlayerProps = {
  player: Player,
  removePlayer: (playerId: string) => void
}

const PlayerComponent = ({ player, removePlayer }: PlayerProps) => {
  return (
    <CardWrapper>
      <Photo src={player.photo || 'photo'} alt="Player" />
      <h3>{player.name}</h3>
      <button onClick={() => removePlayer(player.id)}>Remove</button>
    </CardWrapper>
  );
};

export default PlayerComponent;