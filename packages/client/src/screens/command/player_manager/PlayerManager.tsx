import React, { useContext } from 'react'
import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import PlayerComponent from './Player';
import Webcam from 'react-webcam';
import { Topic, Player } from '../../../../../shared/src/types/common';
import { AppStateContext } from '@shared/components/AppStateContext';

const PlayerManagementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayerListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const CameraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WebcamContainer = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 10px;

  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const usePlayerManager = () => {
  const { appState, isLoaded } = useContext(AppStateContext)

  const players = isLoaded && appState ? appState.players : []
  
  const { emit } = useContext(AppStateContext)

  const addPlayer = useCallback(({ name, photo }: Omit<Player, 'id'>) => {
    if (name.trim() && photo) {
      emit({
        topic: Topic.PLAYERS,
        action: 'ADD_PLAYER',
        payload: { name, photo }
      });
    }
  }, [emit, players]);

  const removePlayer = (id: string) => {
    emit({
      topic: Topic.PLAYERS,
      action: 'REMOVE_PLAYER',
      payload: { id }
    });
  };

  return {
    players,
    addPlayer,
    removePlayer,
  }
}

const PlayerManagement = () => {
  const webcamRef = useRef<Webcam>(null);

  const [name, setName] = useState('');

  const {
    addPlayer,
    removePlayer,
    players
  } = usePlayerManager()

  const handleClickAddPlayer = useCallback(() => {
    const photo = webcamRef.current?.getScreenshot();

    if (photo) {
      addPlayer({ name, photo })
      setName('');  
    }
  }, [
    name,
    webcamRef.current,
    addPlayer
  ])

  return (
    <PlayerManagementWrapper>
      <CameraWrapper>
        <WebcamContainer>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="200"
            height="200"
          />
        </WebcamContainer>
        {/* {capturedImage && <img src={capturedImage} alt="Captured" />} */}
      </CameraWrapper>
      
      <InputWrapper>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={handleClickAddPlayer}>Add</button>
      </InputWrapper>
      {players && (
        <PlayerListWrapper>
          {players.map(player => (
            <PlayerComponent
              key={player.id}
              player={player}
              removePlayer={removePlayer}
            />
          ))}
        </PlayerListWrapper>
      )}
    </PlayerManagementWrapper>
  );
};

export default PlayerManagement;