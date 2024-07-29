import { ComponentType } from 'react'
import { SubjectLike } from 'rxjs'

import { AppState, EmitFn, EmitHandlerFn } from '../../shared/src/types/common'
import { FromClientEvent } from '../../shared/src/types/events/utils/ClientEvent'
import { FromGameEvent, ToGameEvent } from '../../shared/src/types/events/GameEvent'

export type CustomComponentProps<
  TFromEvent extends FromGameEvent,
> = {
  useGameSocketEmit?:  () => {
    emitHandler: EmitHandlerFn<TFromEvent>;
    emit: EmitFn<TFromEvent>;
  }
  useGameSocketState?: <TState>(path: string, defaultWhileLoading?: TState) => [boolean, TState | undefined, SubjectLike<TState>]
}

type CustomComponent<
  TFromEvent extends FromGameEvent
> = ComponentType<CustomComponentProps<TFromEvent>>

export type GameConfig<
  TGameState,
  TFromEvent extends FromGameEvent,
  TToEvent extends ToGameEvent,
> = {
  // keep in mind that some of this component will be rendered on the command entity and some on the display entity
  // that's why the socket hooks are injected via props
  Preview: CustomComponent<TFromEvent>,       // for display entity
  ScoreBoard: CustomComponent<TFromEvent>,    // for display entity
  RoundManager: CustomComponent<TFromEvent>,  // for display entity
  Outcome: CustomComponent<TFromEvent>,       // for display entity
  Thumbnail: CustomComponent<TFromEvent>,     // for command entity
  onEvent: (                                  // for controller logic
    event: TToEvent,
    appState: AppState<TGameState>,
    emit: ( event: TFromEvent ) => void
  ) => TGameState | undefined,
  isPlayable: (appState: AppState) => boolean     // for command ready to play button
}