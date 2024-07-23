import { Entity, Game } from '../common'
import { GenericEvent } from './common'

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
  >
