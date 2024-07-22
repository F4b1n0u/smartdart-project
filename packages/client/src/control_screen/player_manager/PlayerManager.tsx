import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import PlayerComponent from './Player';
import Webcam from 'react-webcam';
import { Entity, Player } from '../../../../shared/src/types/common';
import { useSocketState } from '../../useSocketState';
import { v4 as uuidv4 } from 'uuid'

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
  // TODO add a useSocket at the root of every client and rely on it to avoid to have to pass down the entity every time
  const { state, isLoaded, emit } = useSocketState<Array<Player>>(Entity.CONTROL_SCREEN, 'players')
  const players = state || []

  const addPlayer = useCallback(({ name, photo }: Omit<Player, 'id'>) => {
    if (name.trim() && photo) {
      // TODO rely on action to add and remove, this will prevent the client to generate ids and to filter array to remove entries
      // this is business "logic" this should be in the backend !
      emit('ADD_PLAYER', { id: uuidv4(), name, photo });
    }
  }, [emit, players]);

  const removePlayer = (id: string) => {
    emit('REMOVE_PLAYER', { id });
  };

  return {
    isLoaded,
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
    players,
    isLoaded
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
      {isLoaded && (
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
      
      <button>Dartboard</button>
      <button>Settings</button>
    </PlayerManagementWrapper>
  );
};

export default PlayerManagement;