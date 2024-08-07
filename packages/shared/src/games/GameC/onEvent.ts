import { produce } from 'immer';
import { MULTIPLIER_TO_NUMBER, Player, Round, Topic } from '../../types/common';
import { GameCState, GameCConfig } from './types';

const initialGameCState: GameCState = {
  status: 'IDLE',
  nextPlayerIdByCurrentPlayerId: {},
  currentPlayerId: undefined,
  rounds: [],
  maxThrowsPerRound: 3
};

const TARGET_SCORE = 100;

const getCurrentRound = (gameState: GameCState): Round | undefined => {
  return gameState.rounds.find(({ status }) => status === 'IN_PROGRESS');
};

const updateCanFinishOfCurrentRound = (gameState: GameCState) => {
  const currentRound = getCurrentRound(gameState);
  if (currentRound) {
    currentRound.canFinishRound = currentRound.throws.length > 2;
  }
};

export const onEvent: GameCConfig['onEvent'] = (event, appState) => {
  const { status, players, game: gameState } = appState;
  if (status !== 'PLAYING_GAME') {
    return undefined;
  }

  const { topic, action } = event;

  const newGameState = produce(gameState || initialGameCState, (draft) => {
    switch (topic) {
      case Topic.GAMES: {
        if (action === 'START_SELECTED_GAME') {
          const nextPlayerIdByCurrentPlayerId = players.reduce<Record<Player['id'], Player['id']>>(
            (acc, { id }, index, arr) => {
              const nextPlayerId = arr[(index + 1) % arr.length].id;
              acc[id] = nextPlayerId;
              return acc;
            },
            {} as Record<Player['id'], Player['id']>
          );

          Object.assign(draft, initialGameCState, {
            nextPlayerIdByCurrentPlayerId,
            currentPlayerId: appState.players?.[0].id,
            rounds: []
          });
        }
        break;
      }

      case Topic.DARTBOARD: {
        if (action === 'NOTIFY_THROW_LANDED' && draft.status === 'RUNNING') {
          const currentRound = getCurrentRound(draft);
          if (currentRound && currentRound.canFinishRound) {
            return;
          }

          const { payload: location } = event;
          const lastRound = draft.rounds[draft.rounds.length - 1];
          lastRound.throws.push({ location });
          updateCanFinishOfCurrentRound(draft);
        }
        break;
      }

      case Topic.GAME: {
        switch (action) {
          case 'START_ROUND': {
            draft.status = 'RUNNING';
            draft.rounds.push({
              status: 'IN_PROGRESS',
              playingPlayerId: draft.currentPlayerId!,
              throws: [],
              canFinishRound: false
            });
            break;
          }

          case 'MISS_THROW': {
            const lastRound = draft.rounds[draft.rounds.length - 1];
            lastRound.throws.push({}); // no location as it is missed
            break;
          }

          case 'SIMULATE_THROW': {
            const currentRound = getCurrentRound(draft);
            if (currentRound?.canFinishRound) {
              return;
            }
            const { payload: location } = event;
            const lastRound = draft.rounds[draft.rounds.length - 1];
            lastRound.throws.push({ location });
            break;
          }

          case 'CANCEL_LAST_THROW': {
            const lastRound = draft.rounds[draft.rounds.length - 1];
            lastRound.throws.pop();
            break;
          }

          case 'FINISH_ROUND': {
            const totalScorePerPlayerId = players.reduce<Record<Player['id'], number>>((lookup, { id }) => {
              const playerTotal = gameState!.rounds
                .filter(({ playingPlayerId }) => playingPlayerId === id)
                .reduce(
                  (total, { throws }) =>
                    total + throws.reduce(
                      (acc, { location }) =>
                        acc + (location ? location.score * MULTIPLIER_TO_NUMBER[location.multiplier] : 0),
                      0
                    ),
                  0
                );

              lookup[id] = playerTotal;
              return lookup;
            }, {});

            const rankPlayers = (playerScores: Record<Player['id'], number>) => {
              const playersArray = Object.entries(playerScores).map(([playerId, score]) => ({
                playerId,
                score
              }));

              playersArray.sort((a, b) => b.score - a.score);
              return playersArray;
            };

            const [{ score: highestScore }] = rankPlayers(totalScorePerPlayerId);

            const isGameOver = highestScore > TARGET_SCORE;

            draft.status = isGameOver ? 'FINISHED' : 'IDLE';
            draft.currentPlayerId = draft.nextPlayerIdByCurrentPlayerId[draft.currentPlayerId!];
            const lastRound = draft.rounds[draft.rounds.length - 1];
            lastRound.status = 'FINISHED';
            break;
          }
        }
        updateCanFinishOfCurrentRound(draft);
        break;
      }
    }
  });

  return newGameState;
};