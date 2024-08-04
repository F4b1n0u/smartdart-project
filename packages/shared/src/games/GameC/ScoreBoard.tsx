import 'react'
import { AppStateContext } from '@shared/components/AppStateContext';
import { VirtualDartBoard } from '@shared/components/VirtualDartBoard';
import React, { useContext } from 'react';
import { GameCState } from './types';

import styled from 'styled-components';
import { MULTIPLIER_TO_NUMBER, Player } from '@shared/types/common';

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

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Game = styled.div`
  display: flex;
  flex-direction: row;
`

const CurrentPlayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Dartboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NextPlayers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Rank = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

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

const unrollPlayerSequence = (
  currentPlayerId: Player['id'],
  nextPlayerIdByCurrentPlayerId: Record<Player['id'], Player['id']>,
) => {
  const playerSequence = [];
  let nextPlayerId = nextPlayerIdByCurrentPlayerId[currentPlayerId];

  while (nextPlayerId !== currentPlayerId) {
    playerSequence.push(nextPlayerId);
    nextPlayerId = nextPlayerIdByCurrentPlayerId[nextPlayerId];
  }

  return playerSequence;
}

const rankPlayers = (playerScores: Record<Player['id'], number>) => {
  // Convert the map into an array of objects { playerId, score }
  const playersArray = Object.entries(playerScores).map(([playerId, score]) => ({
    playerId,
    score
  }));

  // Sort the array by score in descending order
  playersArray.sort((a, b) => b.score - a.score);

  return playersArray;
}

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

  const { currentPlayerId, rounds, nextPlayerIdByCurrentPlayerId } = gameState
  const currenPlayer = players.find(({ id }) => id === currentPlayerId)

  const currentRound = rounds.find(({ status }) => status === 'IN_PROGRESS') || { throws: [] }

  const throws = currentRound?.throws
    .filter(({ location }) => !!location)

  const nextPlayers = currentPlayerId
    ? unrollPlayerSequence(currentPlayerId, nextPlayerIdByCurrentPlayerId)
      .map(playerId => players.find(({ id }) => id === playerId))
    : []

  const totalScorePerPlayerId = players.reduce<Record<Player['id'], number>>((lookup, { id }) => {
    const playerTotal = rounds.filter(({ playingPlayerId }) => playingPlayerId === id).reduce(
      (total, { throws }) => total + throws.reduce(
        (acc, { location }) =>
          acc + (
            location
              ? location.score * MULTIPLIER_TO_NUMBER[location.multiplier]
              : 0
          ),
        0
      ),
      0
    )
    
    return {
      ...lookup,
      [id]: playerTotal
    }
  }, {})

  switch(gameState.status) {
    case 'FINISHED': {
      return (
        <div>
          {rankPlayers(totalScorePerPlayerId).map(({ playerId, score }, index) => (
            <Rank key={playerId}>
              <span>#{index + 1}</span>
              <PlayerComponent {...players.find(({ id }) => id === playerId)!}/>
              <span>score: {score}</span>
            </Rank>
          ))}
        </div>
      )
      break
    }

    case 'RUNNING': {
      return (
        <Root>
          <Title>
            <span>Game C Scoreboard</span>
    
          </Title>
          <Game>
            <CurrentPlayer>
            {currenPlayer && (
              <>
                <PlayerComponent {...currenPlayer}/>
                <span>score: {totalScorePerPlayerId[currentPlayerId!]}</span>
              </>
            )}
            </CurrentPlayer>
    
            <Dartboard>
            <VirtualDartBoard
              center={{ x: 100, y: 100}}
              scale={1}
              height={200}
              width={200}
              throws={throws}
            />
            </Dartboard>
    
            <NextPlayers>
              <span>up next</span>
              {nextPlayers.map(player => (
                <>
                  <PlayerComponent key={player!.id} {...player!}/>
                  <span>total score: {totalScorePerPlayerId[player!.id]}</span>
                </>
              ))}
            </NextPlayers>
          </Game>
        </Root>
      )
      break
    }
  }
}