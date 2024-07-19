import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Player from './Player';
import CameraView from './CameraView';

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

const initialPlayersData = [
  { id: 1, name: 'Player 1', photo: null },
  { id: 2, name: 'Player 2', photo: null },
  { id: 3, name: 'Player 3', photo: null },
  { id: 4, name: 'Player 4', photo: null }
];

const usePlayerManager = () => {
  const [players, setPlayers] = useState(initialPlayersData);


  const addPlayer = useCallback(({name, photo}) => {
    if (name.trim() && photo) {
      setPlayers([...players, { id: players.length + 1, name, photo }]);
    }
  }, [setPlayers, players]);

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return {
    players,
    addPlayer,
    removePlayer,
  }
}

const PlayerManagement = () => {
  usePlayerManager
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const {
    addPlayer,
    removePlayer,
    players
  } = usePlayerManager()

  const handleClickAddPhoto = useCallback(() => {
    addPlayer({ name, photo })
    setName('');
    setPhoto(null);
  }, [
    name,
    photo,
    addPlayer
  ])

  return (
    <PlayerManagementWrapper>
      <CameraView onCapture={setPhoto} />
      <InputWrapper>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={handleClickAddPhoto}>Add</button>
      </InputWrapper>
      <PlayerListWrapper>
        {players.map(player => (
          <Player
            key={player.id}
            player={player}
            removePlayer={removePlayer}
          />
        ))}
      </PlayerListWrapper>
      <button>Dartboard</button>
      <button>Settings</button>
    </PlayerManagementWrapper>
  );
};

export default PlayerManagement;