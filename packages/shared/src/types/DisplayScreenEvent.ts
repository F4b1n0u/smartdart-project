import { Entity } from './common'
import { GenericEvent } from './event'
import { Game, Dart } from './common'

// Event that the Display Screen is going to RECEIVE/HANDLE
type GenericDisplayScreenEvent<TAction extends string, TPayload> = GenericEvent<
  TAction,
  TPayload,
  Entity.CONTROLLER,
  Entity.DISPLAY_SCREEN
>
export type DisplayScreenEvent = 
  GenericDisplayScreenEvent<
    'PREVIEW_GAME',
    Game
  > | 
  GenericDisplayScreenEvent<
    'DISPLAY_GAME',
    Game
  > | 
  GenericDisplayScreenEvent<
    'ACK_DART_LAND',
    Dart
  >
