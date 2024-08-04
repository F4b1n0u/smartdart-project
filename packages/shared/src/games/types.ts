import { ComponentType } from 'react'

import { AppState } from '@shared/types/common'
import { ToGameEvent } from '@shared/types/events/GameEvent'
import { FromClientEvent } from '@shared/types/events/utils/ClientEvent'


export type GameConfig<
  TGameState,
  TFromEvent extends FromClientEvent,
  TToEvent extends ToGameEvent,
> = {
  // keep in mind that some of this component will be rendered on the command entity and some on the display entity
  // that's why the socket hooks are injected via props
  Preview: ComponentType,                     // for display entity
  ScoreBoard: ComponentType,    // for display entity
  Outcome: ComponentType,                     // for display entity
  RoundManager: ComponentType,  // for command entity
  Thumbnail: ComponentType,                   // for command entity
  onEvent: (                                  // for controller logic
    event: TFromEvent,                // event from client to controller, relay to the game logic
    appState: AppState<TGameState>,
    emit: ( event: TToEvent ) => void // emit from the server to the client
  ) => TGameState | undefined,
  isPlayable: (appState: AppState<TGameState>) => boolean     // for command ready to play button
}