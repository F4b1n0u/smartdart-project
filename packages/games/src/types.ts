import { ComponentType } from 'react'
import { GenericEvent } from '../../shared/src/types/event'
import { ClientTopic, Topic, AppState } from '../../shared/src/types/common'

export type GameConfig<TGameState> = {
  Preview: ComponentType,
  RunningGame: ComponentType,
  Thumbnail: ComponentType,
  RoundManager: ComponentType,
  Outcome: ComponentType,
  logic: (
    appState: AppState,
    emit: ( event: FromGameEvent<TGameState> ) => void
  ) => TGameState,
}

export type FromGameEvent<TGameState> =
  GenericEvent<
    'TERMINATE_GAME',
    TGameState,
    ClientTopic,
    Topic.CONTROLLER
  >

export type ToGameEvent<TGameState> =
  GenericEvent<
    'ROUND_FINISHED',
    TGameState,
    Topic.CONTROLLER,
    ClientTopic
  > |
  GenericEvent<
    'DART_LANDED',
    TGameState,
    Topic.CONTROLLER,
    ClientTopic
  >
