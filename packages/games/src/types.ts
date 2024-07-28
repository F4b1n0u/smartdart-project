import { ComponentType } from 'react'
import { FromDefaultGamesEvent, ToDefaultGamesEvent } from '../../shared/src/types/events/DefaultGamesEvent'
import { AppState } from '../../shared/src/types/common'

export type GameConfig<TGameState> = {
  Preview: ComponentType,
  ScoreBoard: ComponentType,
  Thumbnail: ComponentType,
  RoundManager: ComponentType,
  Outcome: ComponentType,
  logic: (
    appState: AppState,
    emit: ( event: FromGameEvent ) => void
  ) => TGameState,
  isPlayable: (appState: AppState) => boolean
}


export type FromGameEvent = FromDefaultGamesEvent

export type ToGameEvent = ToDefaultGamesEvent
